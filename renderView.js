import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import {Provider} from "mobx-react";
import createBrowserHistory from "history/createBrowserHistory";
import {Route, Router} from "react-router-dom";
import auth from "./src/model/auth";
import Index from "./src/view/index";
const express = require('express')
const path = require('path')
const browserHistory = createBrowserHistory();

const stores = {
    // Key can be whatever you want
    // ...other stores
    auth: auth
};

const app = express()

app.get('*', async (req, res) => {
    const reactContent = ReactDOMServer.renderToStaticMarkup( 
    <Provider {...stores}>
        <Router history={browserHistory}>
            <Route path="/" component={Index}/>
        </Router>
    </Provider>);
    generateHtml(stores, reactContent);
})

function generateHtml(data, reactStr) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
      <title>index</title>
      <script>window.__mobx_init_store = ${JSON.stringify(data)}</script>
  </head>
  <body>
      <div id="root">${reactStr}</div>
      <script src="main.js"></script>
  </body>
  </html>
  `
}
