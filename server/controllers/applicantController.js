const JbUser = require('../models').JbUser;
const Employer = require('../models').Employer;
const Applicants = require('../models').Applicants;
const Job = require('../models').Job;
let uuid = require('uuid');

module.exports = {
	create(req, res) {
		"use strict";
		console.log("user created");
		console.log("user information:", req.body);
		return Applicants
			.create({
				firstName: req.body.fName,
				lastName: req.body.lName,
				email: req.body.email,
				state: req.body.state,
				city: req.body.city,
				zip: req.body.zip,
				homePhone: req.body.homePhone,
				cellPhone: req.body.cellPhone,
				website: req.body.website,
				linkedin: req.body.linkedin,
				github: req.body.github,
				resume: req.body.resume,
				coverLetter: req.body.coverLetter,
				jobId: req.body.jobId,
				employerId: req.body.employerId
			})
			.then((applicant) => {
				//TODO need to add applicant to JobApplications
				return Job.findById(req.body.jobId)
					.then(job => {
						return job.addApplicant(applicant)
							.then((JobApplication) => {
								console.log("applicant added..", JobApplication);
								res.status(201).send(JobApplication);
							})

					})

			})
			.catch((error) => {
				res.status(400).send(error);
			})
	},

	list(req, res) {
		"use strict";
		console.log('applicant listed');
	}
};