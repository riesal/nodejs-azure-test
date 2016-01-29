// server.js
// setup, get all we need

var express = require('express');
var app = express();
var port = process.env.PORT || 1337;
// var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');

// config
// begin

// mongoose.connect(configDB.url);
// require('./config/passport')(passport);

// setup express apps
app.use(morgan('dev')); // log request to console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // setup ejs templating

// require passport
app.use(session({ secret: 'merrychristmas' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login session
app.use(flash()); // use connect-flash for flash messsages stored in session

// routes
 require('./app/routes.js')(app, passport); // load our routes and pass in app

// launch
app.listen(port); // bind to port
console.log('whmcsLogin happens on port ' + port);

