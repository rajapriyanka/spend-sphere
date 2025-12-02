import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Records(){
  const [records, setRecords] = useState([]);

  const loadData = () => api.get('/transactions/records').then(r => setRecords(r.data)).catch(()=>{});

  useEffect(() => { loadData() }, []);

  return (
    <div className="container">
      <h1>Records</h1>
      {records.length===0 ? <p>No records</p> : records.map(r=>(
        <div key={r.id} style={{border:'1px solid #ddd', padding:10, marginBottom:8}}>
          <div><strong>{r.title}</strong></div>
          <div>Amount: {r.amount}</div>
          <div>Type: {r.type}</div>
        </div>
      ))}
    </div>
  );
}
