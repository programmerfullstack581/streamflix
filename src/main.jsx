import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Registrar Service Worker para PWA e instalación en pantalla de inicio
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('✅ ServiceWorker registrado con éxito para PWA:', reg.scope);
      })
      .catch((err) => {
        console.warn('⚠️ ServiceWorker no registrado:', err);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
