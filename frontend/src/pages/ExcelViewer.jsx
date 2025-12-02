import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function ExcelViewer(){
  const [url, setUrl] = useState('');
  useEffect(()=>{ api.get('/excel').then(r=>setUrl(r.data.fileUrl)).catch(()=>{}); }, []);
  return (
    <div className="container">
      <h1>Excel Viewer</h1>
      {url ? <iframe src={url} style={{width:'100%',height:600,border:0}} title="excel-viewer" /> : <p>No file</p>}
    </div>
  );
}
