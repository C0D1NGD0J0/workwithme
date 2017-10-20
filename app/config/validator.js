'use strict';

function validateContactForm(req, res, next){
	req.checkBody('name', 'Name field empty').notEmpty();
	req.checkBody('email', 'Email not valid').isEmail();
	req.checkBody('subject', "Subject field can't be blank").notEmpty();
	req.checkBody('contact_msg', "Contact message field can't be blank").notEmpty();

	let errors = req.validationErrors();
	
	if(errors){
		res.render('pages/contact', {
			name: req.body.name,
			email: req.body.email,
			subject: req.body.subject,
			contact_msg: req.body.contact_msg,
			flashErr: errors
		});
		console.log(errors);
	} else {
		return next();
	}
}

function validateSignupForm(req, res, next){
	req.checkBody('username', 'Empty username field').notEmpty();
	req.checkBody('email', 'Invalid email').isEmail();
	req.checkBody('password', 'Empty password field').notEmpty();
	req.checkBody('confirm_password', 'Password do not match').equals(req.body.confirm_password).notEmpty();

	let errors = req.validationErrors();
	
	if(errors){
		res.render('auth/signup', {
			username: req.body.username,
			email: req.body.email,
			flashErr: errors
		});
		console.log(errors);
	} else {
		return next();
	}
}

module.exports = {
	validateContactForm,
	validateSignupForm
}