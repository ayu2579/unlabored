import express from 'express';
import { App } from './app/containers';
import { renderToString } from 'react-dom/server';

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  const __html = renderToString(App());
  response.render('pages/index', { __html });
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
