const db = require('../config/db');

// ------------- RECORDS CRUD ---------------
exports.getRecords = (req, res) => {
    const userId = req.userId;
    db.query('SELECT r.*, c.category_name, t.type_name FROM records r LEFT JOIN categories c ON r.category_id=c.id LEFT JOIN transaction_types t ON r.type_id=t.id WHERE r.user_id=? ORDER BY r.date DESC', [userId], (err, results) => {
        if (err) return res.status(500).json({ message: err });
        res.json(results);
    });
};

exports.addRecord = (req, res) => {
    const userId = req.userId;
    const { category_id, type_id, amount, currency, description, date } = req.body;
    db.query('INSERT INTO records (user_id, category_id, type_id, amount, currency, description, date) VALUES (?, ?, ?, ?, ?, ?, ?)', [userId, category_id, type_id, amount, currency, description, date], (err, result) => {
        if (err) return res.status(500).json({ message: err });
        res.json({ message: 'Record added', id: result.insertId });
    });
};

exports.updateRecord = (req, res) => {
    const { record_id, category_id, type_id, amount, currency, description, date } = req.body;
    db.query('UPDATE records SET category_id=?, type_id=?, amount=?, currency=?, description=?, date=? WHERE id=?', [category_id, type_id, amount, currency, description, date, record_id], (err) => {
        if (err) return res.status(500).json({ message: err });
        res.json({ message: 'Record updated' });
    });
};

exports.deleteRecord = (req, res) => {
    const { record_id } = req.body;
    db.query('DELETE FROM records WHERE id=?', [record_id], (err) => {
        if (err) return res.status(500).json({ message: err });
        res.json({ message: 'Record deleted' });
    });
};
