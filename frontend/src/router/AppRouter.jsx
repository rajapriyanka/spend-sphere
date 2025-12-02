import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Records from '../pages/Records';
import Categories from '../pages/Categories';
import Reports from '../pages/Reports';
import TransactionTypes from '../pages/TransactionTypes';
import ExcelViewer from '../pages/ExcelViewer';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRouter(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />
        <Route path="/types" element={<ProtectedRoute><TransactionTypes /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/excel" element={<ProtectedRoute><ExcelViewer /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
