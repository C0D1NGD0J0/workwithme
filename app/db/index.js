"use strict";
const mongoose = require('mongoose');
const localDB = "mongodb://localhost:27017/workwithme";
const isProduction = (process.env.NODE_ENV === 'production');

mongoose.Promise = global.Promise;
mongoose.connect(localDB);

mongoose.connection.on('open', (err) => {
	if(err) return console.log("Mongoose connection error occured ", err);
	console.log('Connected to Local MongoDB');
});