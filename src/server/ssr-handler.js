import React from 'react';
import App from "../client/app";
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';

function getSSRAppString () {
  const appString = renderToString(<App />);
  const file = fs.readFileSync(path.resolve(__dirname, './public/index.html'), 'utf-8');

 return  file.replace(
   '<div id="root"></div>',
   `<div id="root">${ appString }</div>`
 );
}

function handleSSRAppRender(_, res) {
  const newHtmlString = getSSRAppString();
  return res.send(newHtmlString).status(200).end();
};

export default handleSSRAppRender;
