const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const favicon = require('express-favicon');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, 'public');
const faviconPath = path.join(publicPath, 'img', 'favicon.png');

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(favicon(faviconPath));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    partialsDir: 'views/partials'
}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Victory Granite and Tiles',
        style: 'index.css',
        script: 'index.js'
    });
});

app.post('/email', (req, res) => {
    var email = 'No Email Provided';
    const message = `
    <h3>YOU HAVE A NEW CUSTOMER REQUEST</h3>
    <br>
    <h3>Customer Details</h3>
    <P>Customer Name: ${req.body.name}</P>
    <P>Customer Phone: ${req.body.phone}</P>
    <P>Customer Email: ${req.body.email || email}</P>
    <h2>Message Body</h2>
    <p>${req.body.message}</p>
    `;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'victorycustomerorder@gmail.com',
          pass: 'VICtory@2018',
        },
        tls: {
            rejectUnauthorized: false
        }
      });

       // setup email data with unicode symbols
    let mailOptions = {
        from: `Victory Customer Handler`, // sender address
        to: 'victorygranitesandtiles@gmail.com', // list of receivers
        subject: 'HELLO, I REQUIRE YOUR SERVICES', // Subject line
        html: message // html body
    };
      

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).end();
        }
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}...`);
});