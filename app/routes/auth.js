"use strict";
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const v = require('../config/validator');
const passport = require('passport');
const User = mongoose.model('User');

router.route('/login')
	.get((req, res, next) =>{
		res.render('auth/login', {title: 'Login || WorkWithMe'})
	})

	.post(passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

router.route('/signup')
	.get((req, res, next) =>{
		res.render('auth/signup', {title: 'Register || WorkWithMe'})
	})

	.post(v.validateSignupForm, (req, res, next) =>{
		passport.authenticate('signup',{
			successRedirect: '/login',
			failureRedirect: '/signup'
		})
	});

router.get('/logout', (req, res, next) =>{
	req.logout();
	res.redirect('/');
});

module.exports = router;