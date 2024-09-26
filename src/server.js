import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import fs from 'fs';

import App from './client/app.jsx';
import path from 'path';

const app = express();

app.use('/static/index.html', (_, res) => {
  return res.status(404).end();
});

app.use('/static', express.static('dist/public'));

app.get('*', (_, res) => {
  const appString = renderToString(<App />);
  const file = fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf-8');
  const newHtmlString = file.replace(
    '<div id="root"></div>', `<div id="root">${ appString }</div>`
  );
  return res.send(newHtmlString).status(200).end();
});

app.listen(3003, () => {
  console.log('Server running');
});
