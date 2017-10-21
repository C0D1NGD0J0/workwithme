"use strict";
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(id, done){
	User.findById({_id: id}, function(err, user){
		done(err, user);
	})
});

passport.use('signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function(username, pwd, done){
		User.findOne({username}, function(err, user){
			if(err) return done(err);
			if(user) return done(null, false, {message: 'Username not available.'});
			
			let new_user = new User();
			new_user.username = req.body.username;
			new_user.email = req.body.email;
			new_user.encryptPWD(req.body.password);

			user.save((err) =>{
				if(err) return res.render('auth/signup', {flashErr: err});
				return done(null, user);
			});
		});
	})
);

passport.use('login', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, username, pwd, done){
	User.findOne({username}, (err, user) =>{
		if(err) return done(err);
		if(!user || !user.validatePWD(pwd)) {
			return done(null, false, {message: 'Invalid username/password combination.'});
		}
		return done(null, user);
	});
}));