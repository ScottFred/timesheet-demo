"use strict";

var path = require('path');

var config = require('./config');

// express
var express = require('express');
var app = express();

// mongoose
var mongoose = require('mongoose');
mongoose.connect(config.mongoUrl);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// favicon
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, '../dist/assets/favicon.ico')));

// logger
var logger = require('morgan');
app.use(logger('dev'));

// body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cookie parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// passport config
var passport = require('passport');
var PassportLocalStrategy = require('passport-local').Strategy;
var account = require('./models/account');
passport.use(new PassportLocalStrategy(account.authenticate()));
passport.serializeUser(account.serializeUser());
passport.deserializeUser(account.deserializeUser());

// session
var session = require('express-session');
var MongoSessionStore = require('connect-mongo')(session);
app.use(session({
  secret: config.session.secret,
  store: new MongoSessionStore({url: config.session.mongoUrl}),
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// static
app.use(express.static(path.join(__dirname, '../dist')));

// routes
app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      user : req.user,
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    user : req.user,
    message: err.message,
    error: {}
  });
});

module.exports = app;
