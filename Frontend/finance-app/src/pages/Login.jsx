import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { googleLogin } from '../api/auth';

const Login = () => {
    const { setUser, setToken } = useAuth();

    const handleLoginSuccess = async (credentialResponse) => {
        const res = await googleLogin(credentialResponse.credential);
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        window.location.href = '/';
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
            <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} />
        </div>
    );
};

export default Login;
