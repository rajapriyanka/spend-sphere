const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { generateExcelReport, generateCSVReport, generatePDFReport, sendReportEmail } = require('../controllers/reportsController');

router.post('/excel', verifyToken, generateExcelReport);
router.post('/csv', verifyToken, generateCSVReport);
router.post('/pdf', verifyToken, generatePDFReport);
router.post('/email', verifyToken, sendReportEmail);

module.exports = router;
