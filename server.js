// server.js
//NodeJS provides the require function, whose job is to load modules and give you access to their exports.
// set up ======================================================================
// get all the tools we need
var express  = require('express');//Express is the most popular Node web framework, and is the underlying library for a number of other popular Node web frameworks.
var app      = express();//Calls the express function "express()" and puts new Express application inside the app variable (to start a new Express application).
var port     = process.env.PORT || 8080;//In many environments, and as a convention, you can set the environment variable PORT to tell your web server what port to listen on.
const MongoClient = require('mongodb').MongoClient //The MongoDB module exports MongoClient, and that’s what we’ll use to connect to a MongoDB database.
var mongoose = require('mongoose');//can store JSON documents in it, and the structure of these documents can vary as it is not enforced like SQL databases.
var passport = require('passport');//Authentification middleware. Useful for managing password security/authorization.
var flash    = require('connect-flash');//The flash is a special area of the session used for storing messages.

var morgan       = require('morgan');//morgan is a middleware that allows us to easily log requests, errors, and more to the console.
var cookieParser = require('cookie-parser');//cookie-parser parses cookies and populates req.cookies with objects bidden to cookie names.
var bodyParser   = require('body-parser');//body-parser is a body parsing middleware, which populates the req.body with (for example) the value of the parameters of a POST.
var session      = require('express-session');//The express-sessions NPM module provides a store property where you can set a separate storage mechanism for storing your sessions

var configDB = require('./config/database.js');//A fast way to store configuration data.

var db // declaring a variable that will later hold the database name.

// configuration ===============================================================

//This is making moongooes connect to the url found in the database stored in configDB variable.It then uses a callback and requires the use of routes and arguments of the variables app,passport, and db. It takes follows our routes to load and pass in our app. This is how we connect to our database
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db);
}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'rcbootcamp2019a', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
//require('./app/routes.js')(app, passport, db); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
//This will console.log the below sentence and the number of the port that
app.listen(port);
console.log('The magic happens on port ' + port);
