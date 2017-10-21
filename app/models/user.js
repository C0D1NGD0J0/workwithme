"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

let UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: [true, "Can't be blank"]
	},
	username: {
		type: String,
		minlength: [4, "too short!"],
		unique: true
	},
	hash: String,
	salt: String
}, {timestamps: true});

UserSchema.methods.encryptPWD = function(pwd){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(pwd, this.salt, 1000, 64, 'sha1').toString('hex');
}

UserSchema.methods.validatePWD = function(pwd){
	let hash = crypto.pbkdf2Sync(pwd, this.salt, 1000, 64, 'sha1').toString('hex');
	return this.hash === hash;
}

mongoose.model('User', UserSchema);