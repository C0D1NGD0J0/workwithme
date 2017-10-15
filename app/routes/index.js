"use strict";

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

/* OTHER ROUTES */
router.use('/users', require('./users'));

module.exports = router;