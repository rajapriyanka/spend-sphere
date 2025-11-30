const db = require('../config/db');

// ------------- TRANSACTION TYPES ---------------
exports.getTransactionTypes = (req, res) => {
    const userId = req.userId;
    db.query('SELECT * FROM transaction_types WHERE user_id=?', [userId], (err, results) => {
        if (err) return res.status(500).json({ message: err });
        res.json(results);
    });
};

exports.addTransactionType = (req, res) => {
    const userId = req.userId;
    const { type_name } = req.body;
    db.query('INSERT INTO transaction_types (user_id, type_name) VALUES (?, ?)', [userId, type_name], (err, result) => {
        if (err) return res.status(500).json({ message: err });
        res.json({ message: 'Transaction type added', id: result.insertId });
    });
};

exports.updateTransactionType = (req, res) => {
    const { type_id, type_name, is_active } = req.body;
    db.query('UPDATE transaction_types SET type_name=?, is_active=? WHERE id=?', [type_name, is_active, type_id], (err) => {
        if (err) return res.status(500).json({ message: err });
        res.json({ message: 'Transaction type updated' });
    });
};
