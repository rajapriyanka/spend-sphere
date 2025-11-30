import axios from './axiosConfig';

export const getDashboardData = (token) => {
    return axios.get('/dashboard', { headers: { Authorization: `Bearer ${token}` } });
};
