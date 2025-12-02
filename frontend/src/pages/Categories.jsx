import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Categories(){
  const [cats, setCats] = useState([]);
  useEffect(()=>{ api.get('/transactions/categories').then(r=>setCats(r.data)).catch(()=>{}); }, []);
  return (
    <div className="container">
      <h1>Categories</h1>
      {cats.map(c=> <div key={c.id}>{c.name}</div>)}
    </div>
  );
}
