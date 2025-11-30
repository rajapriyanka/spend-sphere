const db = require('../config/db');

// ------------- CATEGORIES ---------------
exports.getCategories = (req, res) => {
    const userId = req.userId;
    db.query('SELECT * FROM categories WHERE user_id=?', [userId], (err, results) => {
        if (err) return res.status(500).json({ message: err });
        res.json(results);
    });
};

exports.addCategory = (req, res) => {
    const userId = req.userId;
    const { category_name, type_id } = req.body;
    db.query('INSERT INTO categories (user_id, category_name, type_id) VALUES (?, ?, ?)', [userId, category_name, type_id], (err, result) => {
        if (err) return res.status(500).json({ message: err });
        res.json({ message: 'Category added', id: result.insertId });
    });
};

exports.updateCategory = (req, res) => {
    const { category_id, category_name, type_id } = req.body;
    db.query('UPDATE categories SET category_name=?, type_id=? WHERE id=?', [category_name, type_id, category_id], (err) => {
        if (err) return res.status(500).json({ message: err });
        res.json({ message: 'Category updated' });
    });
};
