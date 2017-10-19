"use strict";

const express = require('express');
const router = express.Router();

/* Basic Routes. */
router.get('/', function(req, res, next) {
  res.render('pages/index', {title: "WorkWithMe | A platform for real-time collaboration"});
});

router.get('/about', (req, res, next) => {
	res.render('pages/about', {title: "WorkWithMe | A platform for real-time collaboration"});
});

/* OTHER ROUTES */
router.use('/users', require('./users'));

module.exports = router;