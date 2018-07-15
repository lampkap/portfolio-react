const path = require('path'),
      bodyParser = require('body-parser'),
      express = require('express'),
      app = express(),
      nodemailer = require('nodemailer');

const handleSubmit = (req, res) => {

  const name    = req.body.name || '',
        email   = req.body.email || '',
        message = req.body.message || '',
        date    = req.body.date || '',
        data    = {name, email, message};

  if(date === '') {

      const errors = checkForErrors(data);
      if(!errors) {
          sendMail(data);
          res.json({success: 1})
      } else {
          res.json(errors);
      }
  }
}

const checkForErrors = (data) => {
  
  let messages = {};
  for (let item in data) {
      if (data.hasOwnProperty(item)) {
          if(data[item].trim() === '') {
              messages[item] = 'Your ' + item + ' can not be empty';
          } else {
              if(item === 'name' && !validName(data[item])) {
                  messages[item] = 'Your ' + item + ' is not valid';
              }
              if(item === 'email' && !validEmail(data[item])) {
                  messages[item] = 'Your ' + item + ' is not valid';
              }
          }
      }
  }

  if(Object.keys(messages).length === 0 && messages.constructor === Object) {
      return false;
  } else {
      return messages;
  }
}

const validName = (name) => {
  const re = /^[A-Za-z \s]+$/;
  return re.test(String(name).toLowerCase());
}

const validEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const sendMail = (data) => {
  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: 'diemleyssen@gmail.com', // generated ethereal user
          pass: 'vjfdhpirehqxcxvw' // generated ethereal password
      }
  });

  // TEST ETHEREAL MAIL
  // const transporter = nodemailer.createTransport({
  //     host: 'smtp.ethereal.email',
  //     port: 587,
  //     auth: {
  //         user: 'ud7n27oyq2xl4meq@ethereal.email',
  //         pass: 'Cvf711bZqGJc7qdRpw'
  //     }
  // });

  const mailOptions = {
      from: data.email, // sender address
      to: 'diemleyssen@gmail.com', // list of receivers
      subject: 'Aanvraag website', // Subject line
      html: `<html><body><p>De heer / mevrouw <strong>${data.name}</strong> heeft het contactformulier op de portfolio ingevuld. <br><br>
      Het meegeleverde bericht is als volgt : <br>
      ${data.message} <br><br>
      Deze persoon is te contacteren via het e-mailadres ${data.email}
      </p></body></html>` // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      } 
  });
}

const port = (process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, 'client', 'public')));

app.use(bodyParser.urlencoded({
    extended: true  
}));
app.use(bodyParser.json()); 

app.post('/contact', handleSubmit);

process.env.NODE_ENV = 'production';

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler));
}else{
  const indexPath = path.join(__dirname, 'client', 'build', 'index.html');
  app.get('/', function (_, res) { 
    res.sendFile(indexPath);
  });
}

const server = app.listen(port);
