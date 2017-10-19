"use strict";
require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const ejslayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const port = (process.env.PORT || '3000');

const app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// VIEW ENGINE
app.set('view engine', 'ejs');
app.use(ejslayout);
app.set('views', path.join(__dirname, 'views'));

//ROUTES
app.use('/', require("./app/routes"));

// ERROR HANDLER
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, (err) => {
	if(err) return console.log(err);
	console.log(`Server is live on port ${port}`);
});