import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { CacheProvider } from './Storage/CacheContext';
import { SettingsProvider } from './Storage/SettingsContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <HashRouter>
    <SettingsProvider>
      <CacheProvider>
        <App />
      </CacheProvider>
    </SettingsProvider>
    <ToastContainer />
  </HashRouter >

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
