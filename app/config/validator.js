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

module.exports = {
	validateContactForm
}