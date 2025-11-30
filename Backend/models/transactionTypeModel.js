const db = require('../config/db');

exports.getAllTypes = (userId, callback) => {
    db.query('SELECT * FROM transaction_types WHERE user_id = ?', [userId], callback);
};

exports.addType = (userId, typeName, callback) => {
    db.query('INSERT INTO transaction_types (user_id, type_name) VALUES (?, ?)', [userId, typeName], callback);
};

exports.updateType = (typeId, typeName, isActive, callback) => {
    db.query('UPDATE transaction_types SET type_name=?, is_active=? WHERE id=?', [typeName, isActive, typeId], callback);
};
