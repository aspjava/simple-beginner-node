const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();

//    join() and __dirname comes from the Path module
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug');

//    Tell our app to use the bodyParser package
app.use(bodyParser.urlencoded({extended: true}))


//    Use routes file whenever forward-slash anything is received.
app.use('/', routes);  

//    Allows to load files in the public directory
app.use(express.static('public'));

//    Export our app variable for other files to import and use it.
module.exports = app;


