const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { getExcelReport } = require('../controllers/excelController');

router.get('/', verifyToken, getExcelReport);

module.exports = router;
