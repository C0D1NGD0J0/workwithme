"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
	content: String
});

mongoose.model('Project', ProjectSchema);