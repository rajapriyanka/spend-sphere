import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { googleLoginInit } from '../utils/googleAuth';

export default function Login(){
  const { login } = useAuth();

  const handleGoogle = async (response) => {
    if (!response?.credential) return;
    try {
      await login(response.credential);
      // after login, redirect handled by ProtectedRoute when accessing pages
    } catch(err) {
      console.error('Login failed', err);
      alert('Login failed');
    }
  };

  useEffect(() => {
    googleLoginInit(handleGoogle);
  }, []);

  return (
    <div style={{display:'flex',height:'100vh',alignItems:'center',justifyContent:'center'}}>
      <div>
        <h2 style={{textAlign:'center'}}>Sign in with Google</h2>
        <div id="googleBtn" style={{marginTop:12, display:'flex', justifyContent:'center'}}></div>
      </div>
    </div>
  );
}
