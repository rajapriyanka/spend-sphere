import axios from './axiosConfig';

export const googleLogin = (tokenId) => {
    return axios.post('/auth/google', { tokenId });
};
