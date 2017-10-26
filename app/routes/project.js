"use strict";
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const v = require('../config/validator');
const Project = mongoose.model('Project');

router.get('/project/new', v.isLoggedIn, (req, res, next) =>{
	let new_project = new Project();

	new_project.save((err, data) =>{
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect(`/project/${data._id}`);
		}
	});
});

router.get('/project/:id', (req, res, next) =>{
	let params = req.params.id;
	if(params){
		Project.findById({_id: params}, (err, data) =>{
			if(err || !data) res.render('error', {flashErr: err});
			return res.render('project/show', {content: data.content, roomID: data.id});
		});
	} else {
		res.render('error');
	}
});

module.exports = router;