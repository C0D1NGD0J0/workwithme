"use strict";

const express = require('express');
const router = express.Router();

/* Basic Routes. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

router.get('/about', (req, res, next) => {
	res.render('pages/about', {title: "About | WorkWithMe"});
});

/* OTHER ROUTES */
router.use('/users', require('./users'));

module.exports = router;