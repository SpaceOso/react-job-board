const express = require('express');
const router = express.Router();

const Employer = require('../models').Employer;
const Job = require('../models').Job;
const jwt = require('jsonwebtoken');

module.exports = {
	create(req, res) {
		"use strict";
		console.log("job created");
		return Employer
			.create({
				title: req.body.title,
			})
			.then((job) => res.status(201).send(job))
			.catch((error) => res.status(400).send(error))
	},

	createJob(req, res) {
		"use strict";
		return Job
			.create({
				title: req.body.title,
				location:{
					city: req.body.city,
					state: req.body.state,
					zip: req.body.zip
				},
				description: req.body.description,
				employerId: req.body.employerId.id
			})
			.then((job) => {
				res.status(201).send({
					job
				});
			})
			.catch((error) => {
				// console.log(error);
				res.status(400).send(error)
			})
	},

	getJobs(req, res) {
		"use strict";
		return Employer
			.findById(req.body.employerId)
			.then(employer => {
				return employer.getJobs()
					.then(jobs => {
						res.status(201).send(jobs);
					})
					.catch((error) => {
						console.log(error);
						res.status(400).send(error);
					})

			})
			.catch((error) => res.status(400).send(error));
	}
};