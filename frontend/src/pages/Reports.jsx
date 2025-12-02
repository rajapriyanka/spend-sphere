import React from 'react';
import api from '../api/axios';

export default function Reports(){
  const generateExcel = async () => {
    try {
      await api.post('/reports/excel');
      alert('Excel request sent to backend. Check downloads or Excel viewer.');
    } catch(e){
      alert('Failed to generate report');
    }
  };
  return (
    <div className="container">
      <h1>Reports</h1>
      <button onClick={generateExcel}>Generate Excel</button>
    </div>
  );
}
