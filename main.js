const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const favicon = require('express-favicon');
const app = express();

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, 'public');
const faviconPath = path.join(publicPath, 'img', 'favicon.png');

app.use(express.static(publicPath));
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

app.listen(port, () => {
    console.log(`Server is up on port ${port}...`);
});