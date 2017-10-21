"use strict";
const express = require('express');
const router = express.Router();
const v = require('../config/validator');
const m = require('../config/mailer');
const mailer = require('nodemailer');
const transporter = mailer.createTransport(m.mailerConfig);

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

	.post(v.validateContactForm, (req, res) =>{
		let mailOptions = {
			replyTo: req.body.email,
			to: "WorkWithMe " + process.env.GMAIL_USERNAME,
			subject: req.body.subject,
			text: req.body.contact_msg
		}

		transporter.sendMail(mailOptions, function(err, info){
			if(err) return console.log(err);
			res.render('pages/index', {title: 'WorkWithMe'});
		})
	});

/* OTHER ROUTES */
router.use(require('./auth'));
router.use(require('./project'));

module.exports = router;