import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { generateExcelReport, generatePDFReport, sendReportEmail } from '../api/reports';

const Reports = () => {
    const { token } = useAuth();
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [email, setEmail] = useState('');

    const handleExcel = async () => {
        await generateExcelReport(month, year, token);
        alert('Excel Report Generated');
    };

    const handlePDF = async () => {
        await generatePDFReport(month, year, token);
        alert('PDF Report Generated');
    };

    const handleSendEmail = async () => {
        await sendReportEmail(month, year, email, token);
        alert('Report Sent');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Reports</h1>
            <div className="mb-4 flex gap-2">
                <input type="number" placeholder="Month" value={month} onChange={(e) => setMonth(e.target.value)} min="1" max="12"/>
                <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
            <div className="mb-4 flex gap-2">
                <button onClick={handleExcel} className="bg-blue-500 text-white px-4 py-2 rounded">Generate Excel</button>
                <button onClick={handlePDF} className="bg-purple-500 text-white px-4 py-2 rounded">Generate PDF</button>
            </div>
            <div className="mb-4 flex gap-2">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={handleSendEmail} className="bg-green-500 text-white px-4 py-2 rounded">Send Report</button>
            </div>
        </div>
    );
};

export default Reports;
