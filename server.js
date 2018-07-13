const path = require('path'),
      bodyParser = require('body-parser'),
      express = require('express'),
      app = express(),
      FormSubmit = require('./src/submit');

const port = (process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true  
}));
app.use(bodyParser.json()); 

app.post('/contact', FormSubmit.handleSubmit)

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler));
}else{
  const indexPath = path.join(__dirname, 'src/index.html');
  app.get('*', function (_, res) { 
    res.sendFile(indexPath);
  });
}

const server = app.listen(port);
