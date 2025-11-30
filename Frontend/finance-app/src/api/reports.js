import axios from './axiosConfig';

export const generateExcelReport = (month, year, token) =>
    axios.post('/reports/excel', { month, year }, { headers: { Authorization: `Bearer ${token}` } });

export const generatePDFReport = (month, year, token) =>
    axios.post('/reports/pdf', { month, year }, { headers: { Authorization: `Bearer ${token}` } });

export const sendReportEmail = (month, year, email, token) =>
    axios.post('/reports/email', { month, year, email }, { headers: { Authorization: `Bearer ${token}` } });
