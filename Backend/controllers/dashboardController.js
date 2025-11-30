const db = require('../config/db');
const { convertToDefault } = require('../utils/currencyConverter');

// Get Dashboard Data
exports.getDashboard = async (req, res) => {
    const userId = req.userId;

    try {
        // Get user's default currency
        db.query('SELECT currency FROM users WHERE id=?', [userId], async (err, userRes) => {
            if (err) return res.status(500).json({ message: err });
            const defaultCurrency = userRes[0].currency;

            // Fetch all user records
            db.query('SELECT r.*, t.type_name, c.category_name FROM records r LEFT JOIN transaction_types t ON r.type_id=t.id LEFT JOIN categories c ON r.category_id=c.id WHERE r.user_id=? ORDER BY r.date DESC', [userId], async (err, records) => {
                if (err) return res.status(500).json({ message: err });

                let totalIncome = 0;
                let totalExpense = 0;
                let totalSavings = 0;
                const categoryTotals = {};

                for (const rec of records) {
                    // Convert to default currency if needed
                    let amount = rec.amount;
                    if (rec.currency !== defaultCurrency) {
                        amount = await convertToDefault(rec.amount, rec.currency, defaultCurrency);
                    }

                    // Sum totals by type
                    if (rec.type_name.toLowerCase() === 'income') totalIncome += amount;
                    else if (rec.type_name.toLowerCase() === 'expense') totalExpense += amount;
                    else if (rec.type_name.toLowerCase() === 'savings') totalSavings += amount;

                    // Sum category totals
                    if (!categoryTotals[rec.category_name]) categoryTotals[rec.category_name] = 0;
                    categoryTotals[rec.category_name] += amount;
                }

                const balance = totalIncome - totalExpense + totalSavings;

                res.json({
                    defaultCurrency,
                    totalIncome,
                    totalExpense,
                    totalSavings,
                    balance,
                    categoryTotals,
                    recentRecords: records.slice(0, 5) // last 5 transactions
                });
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Dashboard fetch failed' });
    }
};
