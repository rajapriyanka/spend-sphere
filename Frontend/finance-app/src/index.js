import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind + global styles
import './App.css';   // App-specific styles
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create root for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: measure performance
// Pass a function to log results, e.g., reportWebVitals(console.log)
reportWebVitals();
