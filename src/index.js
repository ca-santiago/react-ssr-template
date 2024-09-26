import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './client/app.jsx';

const domNode = document.getElementById('root');

hydrateRoot(domNode, 
  <App />
);
