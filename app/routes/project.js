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

router.get('/project/:id', v.isLoggedIn, (req, res, next) =>{
	let projectID = req.params.id;
	if(projectID){
		Project.findById({_id: projectID}, (err, project) =>{
			if(err || !project) res.render('error', {flashErr: err});
			return res.render('project/show', {project})
		});
	} else {
		res.render('error');
	}
});

module.exports = router;