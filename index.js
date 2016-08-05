import path from 'path';

import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from './app/routes';
import { mapRoutesToApp } from './routers';

const app = express();

app.set('port', (process.env.PORT || 5000));

mapRoutesToApp(app);

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
    res.status(200).render('pages/index', { __html });
  });
});

app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log('Node app is running on port', app.get('port'));
  /* eslint-enable no-console */
});
