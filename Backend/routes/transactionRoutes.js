const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getTransactionTypes, addTransactionType, updateTransactionType } = require('../controllers/transactionsController');
const { getCategories, addCategory, updateCategory } = require('../controllers/categoriesController');
const { getRecords, addRecord, updateRecord, deleteRecord } = require('../controllers/recordsController');

// Transaction Types
router.get('/types', verifyToken, getTransactionTypes);
router.post('/types', verifyToken, addTransactionType);
router.put('/types', verifyToken, updateTransactionType);

// Categories
router.get('/categories', verifyToken, getCategories);
router.post('/categories', verifyToken, addCategory);
router.put('/categories', verifyToken, updateCategory);

// Records
router.get('/records', verifyToken, getRecords);
router.post('/records', verifyToken, addRecord);
router.put('/records', verifyToken, updateRecord);
router.delete('/records', verifyToken, deleteRecord);

module.exports = router;
