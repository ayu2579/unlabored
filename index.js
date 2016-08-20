import _ from 'lodash';
import path from 'path';
import React from 'react';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressValidator from 'express-validator';
import expressUserAgent from 'express-useragent';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from './app/routes';
import { mapRoutesToApp } from './routers';
import { loginUser, defaultParams } from './middlewares';

export const app = express();

const { NODE_ENV, PORT } = process.env;

app.set('port', _.isEqual(NODE_ENV, 'test') ? 5001 : PORT || 5000);

app.use(bodyParser.json({ type: '*/json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(expressUserAgent.express());
app.use(loginUser());
app.use(defaultParams());
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(compression());

mapRoutesToApp(app);

// views is directory for all template files
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/*', (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    const __html = renderToString(<RouterContext {...renderProps} />);
    const browser = _.kebabCase(req.useragent.browser);

    res.status(200).render('pages/index', { __html, browser });
  });
});

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log('Node app is running on port', app.get('port'));
  /* eslint-enable no-console */
});
