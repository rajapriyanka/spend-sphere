const db = require('../config/db');
const ExcelJS = require('exceljs');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Utility: fetch all records for month/year
const getRecordsByMonthYear = (userId, month, year) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT r.*, t.type_name, c.category_name 
            FROM records r 
            LEFT JOIN transaction_types t ON r.type_id=t.id 
            LEFT JOIN categories c ON r.category_id=c.id 
            WHERE r.user_id=? AND MONTH(r.date)=? AND YEAR(r.date)=? 
            ORDER BY r.date ASC`,
            [userId, month, year],
            (err, results) => {
                if (err) reject(err);
                else resolve(results);
            }
        );
    });
};

// ------------- GENERATE EXCEL REPORT -------------
exports.generateExcelReport = async (req, res) => {
    try {
        const { month, year } = req.body;
        const userId = req.userId;
        const records = await getRecordsByMonthYear(userId, month, year);

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Monthly Report');

        sheet.columns = [
            { header: 'Date', key: 'date', width: 15 },
            { header: 'Category', key: 'category_name', width: 20 },
            { header: 'Type', key: 'type_name', width: 15 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Currency', key: 'currency', width: 10 },
            { header: 'Description', key: 'description', width: 30 }
        ];

        sheet.addRows(records);

        const filePath = path.join(__dirname, `../reports/report_${userId}_${month}_${year}.xlsx`);
        await workbook.xlsx.writeFile(filePath);

        // Store in reports table
        db.query('INSERT INTO reports (user_id, month, year, file_path) VALUES (?, ?, ?, ?)', [userId, month, year, filePath]);

        res.json({ message: 'Excel report generated', path: filePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate Excel report' });
    }
};

// ------------- GENERATE CSV REPORT -------------
exports.generateCSVReport = async (req, res) => {
    try {
        const { month, year } = req.body;
        const userId = req.userId;
        const records = await getRecordsByMonthYear(userId, month, year);

        const parser = new Parser();
        const csv = parser.parse(records);

        const filePath = path.join(__dirname, `../reports/report_${userId}_${month}_${year}.csv`);
        fs.writeFileSync(filePath, csv);

        res.json({ message: 'CSV report generated', path: filePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate CSV report' });
    }
};

// ------------- GENERATE PDF REPORT -------------
exports.generatePDFReport = async (req, res) => {
    try {
        const { month, year } = req.body;
        const userId = req.userId;
        const records = await getRecordsByMonthYear(userId, month, year);

        const filePath = path.join(__dirname, `../reports/report_${userId}_${month}_${year}.pdf`);
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(18).text(`Monthly Report - ${month}/${year}`, { align: 'center' });
        doc.moveDown();

        records.forEach(r => {
            doc.fontSize(12).text(`Date: ${r.date} | Category: ${r.category_name} | Type: ${r.type_name} | Amount: ${r.amount} ${r.currency} | Description: ${r.description}`);
        });

        doc.end();
        res.json({ message: 'PDF report generated', path: filePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate PDF report' });
    }
};

// ------------- EMAIL REPORT -------------
exports.sendReportEmail = async (req, res) => {
    try {
        const { month, year, email } = req.body;
        const userId = req.userId;

        // Find latest PDF
        const filePath = path.join(__dirname, `../reports/report_${userId}_${month}_${year}.pdf`);
        if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'Report not found. Generate PDF first.' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Monthly Finance Report - ${month}/${year}`,
            text: 'Please find attached your monthly finance report.',
            attachments: [{ path: filePath }]
        });

        res.json({ message: 'Report emailed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};
