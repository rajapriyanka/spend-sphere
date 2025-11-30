const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const db = require('../config/db');

// Fetch and parse Excel report
exports.getExcelReport = async (req, res) => {
    try {
        const { month, year } = req.query;
        const userId = req.userId;

        // Find the report file path in DB
        db.query(
            'SELECT file_path FROM reports WHERE user_id=? AND month=? AND year=? ORDER BY created_at DESC LIMIT 1',
            [userId, month, year],
            (err, results) => {
                if (err) return res.status(500).json({ message: err });
                if (results.length === 0) return res.status(404).json({ message: 'Report not found' });

                const filePath = results[0].file_path;

                if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'File not found' });

                const workbook = XLSX.readFile(filePath);
                const sheetName = workbook.SheetNames[0];
                const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

                res.json({ data: sheetData });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch Excel report' });
    }
};
