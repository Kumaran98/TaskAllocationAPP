// index.js
import React from 'react';
import ReactDOM from 'react-dom';  
import App, { Footer } from './App'; 
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
