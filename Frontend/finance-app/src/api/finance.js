import axios from './axiosConfig';

export const getRecords = (token) => {
    return axios.get('/finance/records', { headers: { Authorization: `Bearer ${token}` } });
};

export const addRecord = (record, token) => {
    return axios.post('/finance/records', record, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateRecord = (id, record, token) => {
    return axios.put(`/finance/records/${id}`, record, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteRecord = (id, token) => {
    return axios.delete(`/finance/records/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
