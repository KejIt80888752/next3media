import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { analytics } from './data.js';
import './styles.css';

// Google Analytics 4 — only loads when a Measurement ID is set in src/data.js
if (/^G-[A-Z0-9]+$/.test(analytics.gaId)) {
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.gaId}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', analytics.gaId);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
