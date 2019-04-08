const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const nodemailer = require('nodemailer');

const validName = name => {
  const re = /^[A-Za-z \s]+$/;
  return re.test(String(name).toLowerCase());
};

const validEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const checkForErrors = data => {
  const messages = {};
  const fields = Object.keys(data);
  for (const field of fields) {
    if (data[field].trim() === '') {
      messages[field] = `Your ${field} can not be empty`;
    } else {
      if (field === 'name' && !validName(data[field])) {
        messages[field] = `Your ${field} is not valid`;
      }
      if (field === 'email' && !validEmail(data[field])) {
        messages[field] = `Your ${field} is not valid`;
      }
    }
  }

  if (Object.keys(messages).length === 0 && messages.constructor === Object) {
    return false;
  }
  return messages;
};

const sendMail = data => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'diemleyssen@gmail.com', // generated ethereal user
      pass: 'vjfdhpirehqxcxvw', // generated ethereal password
    },
  });

  const mailOptions = {
    from: data.email, // sender address
    to: 'diemleyssen@gmail.com', // list of receivers
    subject: 'Aanvraag website', // Subject line
    html: `<html><body><p>De heer / mevrouw <strong>${
      data.name
    }</strong> heeft het contactformulier op de portfolio ingevuld. <br><br>
      Het meegeleverde bericht is als volgt : <br>
      ${data.message} <br><br>
      Deze persoon is te contacteren via het e-mailadres ${data.email}
      </p></body></html>`, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
};

const handleSubmit = (req, res) => {
  const name = req.body.name || '';
  const email = req.body.email || '';
  const message = req.body.message || '';
  const date = req.body.date || '';
  const data = { name, email, message };

  if (date === '') {
    const errors = checkForErrors(data);
    if (!errors) {
      sendMail(data);
      res.json({ success: 1 });
    } else {
      res.json(errors);
    }
  }
};

const port = process.env.PORT || 8888;

// app.use(express.static(path.join(__dirname, 'client', 'public')));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.post('/contact', handleSubmit);

// process.env.NODE_ENV = 'production';

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler));
  app.use(express.static(path.join(__dirname, 'client', 'public')));
} else {
  app.use(express.static('client/build'));
  const indexPath = path.join(__dirname, 'client', 'build', 'index.html');
  app.get('*', function(_, res) {
    res.sendFile(indexPath);
  });
}

const server = app.listen(port);
