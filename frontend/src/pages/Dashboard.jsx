import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Dashboard(){
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard').then(res => setData(res.data)).catch(()=>{});
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {data ? (
        <div>
          <p>Total Income: {data.income}</p>
          <p>Total Expense: {data.expense}</p>
        </div>
      ) : <p>Loading or no data</p>}
    </div>
  );
}
