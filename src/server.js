import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import App from './client/app.jsx';
import { registerExpressDevServer } from '../scripts/register-dev-server.js';

import { green, enable } from 'colors';
import morgan from 'morgan';

enable();

dotenv.config();

const isDevEnv = process.env.NODE_ENV === 'development';
const APP_PORT = process.env.PORT;

const app = express();

if (isDevEnv) {
  app.use(morgan(`${ green('[SERVER]:') } :method :url :status :res[content-length] - :response-time ms`));
  registerExpressDevServer(app);
}

if (!isDevEnv) {
  app.use('/static/index.html', (_, res) => res.status(404).end());
  app.use('/static', express.static('dist/public'));
}

app.get('*', (_, res) => {
  const appString = renderToString(<App />);
  const file = fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf-8');

  const newHtmlString = file.replace(
    '<div id="root"></div>',
    `<div id="root">${ appString }</div>`
  );
  return res.send(newHtmlString).status(200).end();
});

app.listen(APP_PORT, () => {
  console.log(`${ green('[Server]: ') } Server running at ${ APP_PORT }`);
});
