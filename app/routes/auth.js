"use strict";
const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) =>{
	res.render('auth/login', {title: 'Login || WorkWithMe'})
});

router.get('/signup', (req, res, next) =>{
	res.render('auth/signup', {title: 'Register || WorkWithMe'})
});

module.exports = router;