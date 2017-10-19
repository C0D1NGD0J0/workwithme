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

router.route('/contact')
	.get((req, res, next) =>{
		res.render('pages/contact', {title: 'Contact Us | WorkWithMe'});
	})
	.post((req, res, next) =>{
		res.redirect('/');
	});	

/* OTHER ROUTES */
router.use('/users', require('./users'));

module.exports = router;