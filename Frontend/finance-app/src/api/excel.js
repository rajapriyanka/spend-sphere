import axios from './axiosConfig';

export const getExcelReport = (month, year, token) =>
    axios.get(`/excel?month=${month}&year=${year}`, { headers: { Authorization: `Bearer ${token}` } });
