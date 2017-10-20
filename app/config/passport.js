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

passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(username, pwd, done){
		User.findOne({username}, function(err, user){
			if(err) return done(err);
			if(!user) return done(null, false, {message: 'Incorrect username/password combination!'});
			if(!user.validatePWD(pwd)) return done(null, false, {message: "Incorrect username/password combination!."});
			return done(null, user);
		})
	})
);