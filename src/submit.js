const nodemailer = require('nodemailer'),
      auth = require('../auth.js');

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
            user: auth.username, // generated ethereal user
            pass: auth.password // generated ethereal password
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

module.exports = { handleSubmit };