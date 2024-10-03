import React from 'react';
import App from "../client/app";
import fs from 'fs';
import path from 'path';
import { StaticRouter } from 'react-router-dom/server';

import { renderToString } from 'react-dom/server';

function getSSRAppString (req) {
  const context = { };
  const appString = renderToString(
    <StaticRouter
      location={ req.originalUrl }
      context={ context }
    >
      <App />
    </StaticRouter>
  );
  const file = fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf-8');

 return  file.replace(
   '<div id="root"></div>',
   `<div id="root">${ appString }</div>`
 );
}

function handleSSRAppRender(req, res) {
  const newHtmlString = getSSRAppString(req);
  return res.send(newHtmlString).status(200).end();
};

export default handleSSRAppRender;
