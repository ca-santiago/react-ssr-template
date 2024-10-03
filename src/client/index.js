import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { AppContainer } from 'react-hot-loader';

import App from './app.jsx';
import { BrowserRouter } from 'react-router-dom';

const domNode = document.getElementById('root');

const root = hydrateRoot(
  domNode, 
  <AppContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContainer>
);

if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    const NewApp = require('./app.jsx').default;
    root.render(
      <AppContainer>
        <BrowserRouter>
          <NewApp />
        </BrowserRouter>
      </AppContainer>
    );
  });
}
