"use strict";
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const v = require('../config/validator');
const User = mongoose.model('User');

router.get('/login', (req, res, next) =>{
	res.render('auth/login', {title: 'Login || WorkWithMe'})
});

router.route('/signup')
	.get((req, res, next) =>{
		res.render('auth/signup', {title: 'Register || WorkWithMe'})
	})

	.post(v.validateSignupForm, (req, res, next) =>{
		let user = new User();
		user.username = req.body.username;
		user.email = req.body.email;
		user.encryptPWD(req.body.password);

		user.save((err) =>{
			if(err){
				res.render('auth/signup', {flashErr: err});
			} else {
				res.redirect('/login');
			}
		})
	});


module.exports = router;