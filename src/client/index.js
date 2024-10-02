import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { AppContainer } from 'react-hot-loader';

import App from './app.jsx';

const domNode = document.getElementById('root');

const root = hydrateRoot(
  domNode, 
  <AppContainer>
    <App />
  </AppContainer>
);

if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    const NewApp = require('./app.jsx').default;
    root.render(
      <AppContainer>
        <NewApp />
      </AppContainer>
    );
  });
}
