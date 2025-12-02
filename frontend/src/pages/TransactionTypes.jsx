import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function TransactionTypes(){
  const [types, setTypes] = useState([]);

  useEffect(()=>{ api.get('/transactions/types').then(r=>setTypes(r.data)).catch(()=>{}); }, []);

  return (
    <div className="container">
      <h1>Transaction Types</h1>
      <ul>
        {types.map(t=> <li key={t.id}>{t.name}</li>)}
      </ul>
    </div>
  );
}
