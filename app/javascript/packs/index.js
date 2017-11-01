import React from 'react';
import ReactDOM from 'react-dom';
import App from '../react/src/App';

document.addEventListener('DOMContentLoaded', () => {
  let app = document.getElementById('app')
  if(app) {
    ReactDOM.render(<App />, app);
  }
})
