import _ from 'lodash';
import path from 'path';
import React from 'react';
import express from 'express';
import compression from 'compression';
import expressUserAgent from 'express-useragent';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from './app/routes';
import { routesMapToApp } from './routers';

const app = express();

app.set('port', (process.env.PORT || 5000));

routesMapToApp(app);

app.use(compression());
app.use(expressUserAgent.express());
app.use(express.static(path.join(__dirname, '/public')));

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
