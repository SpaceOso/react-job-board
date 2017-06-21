/**
 * Created by Rico on 9/20/16.
 */

/*These are the routes from express*/
 let express = require('express');
 let router = express.Router();
 let passwordHash = require('password-hash');
 let Employer = require('../models/employer');
 let Job = require('../models/jobs');
 let Applicants = require('../models/applicants');
 let jwt = require('jsonwebtoken');

//TODO: There has to be a way that we can get only one item from this
router.get('/employerRegister', function (req, res, next) {
	Employer.findById(req.query.employerId, function (err, docs) {
		if (err) {
			return res.status(404).json({
				title: 'An Error ocurred',
				error: err
			});
		}
		res.status(200).json({
			message: 'Success',
			obj: docs
		});
	});
});


router.get('/employerLogin', function (req, res, next) {

	Employer.findOne({email: req.query.email}, function (err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			})
		}

		if (!doc) {
			return res.status(404).json({
				title: 'No user found',
				error: {message: 'User could not be found'}
			})
		}

		if (!passwordHash.verify(req.query.password, doc.password)) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}

		var token = jwt.sign({employer: doc}, 'secret', {expiresIn: 7200});
		res.status(200).json({
			message: 'Success',
			token: token,
			employer: doc
		})
	})
});

//requires an object with employerData and userId properties
router.post('/register', function (req, res, next) {
	console.log("in the root register route with:", req.body);

	//using the employer model
	let employer = new Employer({
		companyName: req.body.employerData.companyName,
		logoImg: req.body.employerData.logoImg,
		location: {
			address: req.body.employerData.address,
			city: req.body.employerData.city,
			state: req.body.employerData.state,
			zip: req.body.employerData.zip
		},
		socialMedia:{
			website: req.body.employerData.website,
			twitter: req.body.employerData.twitter,
			facebook: req.body.employerData.facebook,
			linkedin: req.body.employerData.linkedin
		}
	});
	
	user.findById(req.body.userId, function (error, user) {
		
    })

	/*employer.save(function (err, result) {
		if (err) {
			return res.status(404).json({
				title: 'An Error ocurred',
				error: err
			});
		}
		let token = jwt.sign({employer: employer}, process.env.secretkey, {expiresIn: 7200});

		return res.status(201).json({
			token: token,
			employer: result
		});
	})*/
});


router.param('id', function (req, res, next, id) {
	//TODO: decipher why the hell we need this for
	if (req.query.id != undefined) {
		Employer.findOne({'_id': req.query.id}, function (err, docs) {
			if (err) {
				next(err);
			} else if (docs) {
				req.employer = docs;
				next();
			} else {
				next();
			}
		});
	}

	if (req.query.jobId != undefined) {
		next();
	}

	if (req.body.employerId != undefined) {
		Employer.findOne({'_id': req.body.employerId}, function (err, docs) {
			if (err) {
				next(err);
			} else if (docs) {
				req.employer = docs;
				next();
			} else {
				next();
			}
		});

	}
});

router.get('/employerDashboard/:id/applicants', function(req, res, next){

	Applicants.find({employerID: req.employer._id}, function (err, applicants) {
        if (err) {
            res.status(404).json({
                title: 'An error occurred finding applicants',
                error: err
            })
        }

    })
		.sort({createdAt: -1})
		.populate('jobID', 'jobTitle')
		.exec(function (err, applicant ) {
            if(err){
            }

            if(applicant) {
                res.status(200).json({
                    message: 'Success',
                    applicants: applicant,
                })
            }
        });
});


router.param('jobId', function (req, res, next, jobId) {
	// TODO: decipher why the hell we need this for
	Job.findById(req.query.jobId, function (err, doc) {
		if (err) {
			res.status(404).json({
				title: 'An error occurred',
				error: err
			})
		}

		if (!doc) {
			res.status(404).json({
				title: 'No user found',
				error: {message: 'User could not be found'}
			})
		}

		if (doc) {
			req.jobId = doc;
			next();
		}
	});
});

router.delete('/employerdashboard/:id/employerhome', function (req, res, next) {
	//I was using Job.find() but it wasn't returning the job in the call back
	//switching it to Job.findById() fixed this.
	Job.findById({_id: req.query.jobId}, function (err, job) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			})
		}

		if (!job) {
			return res.status(404).json({
				title: 'No user found',
				error: {message: 'User could not be found'}
			})
		}

		job.remove(function (err, result) {
			if (err) {
				return res.status(500).json({
					title: "An error occurred",
					error: err
				});
			}
			res.status(200).json({
				message: "Deleted job",
				obj: result
			})
		});
	})
});

router.get('/employerdashboard/:id/employerhome', function (req, res, next) {


	//grabs all the jobs form an employer
	Job.find({employer: req.employer._id}, function (err, doc) {
		if (err) {
			res.status(404).json({
				title: 'An error occurred',
				error: err
			})
		}

		if (!doc) {
			res.status(404).json({
				title: 'No user found',
				error: {message: 'User could not be found'}
			})
		}
	})
		.sort({createdAt: -1})
        .populate("applicants")
		.populate("registeredApplicants")
		.exec(function(error, docs){
				res.status(200).json({
					message: 'Success',
					jobs: docs,
				})
		})
});


router.post('/employerDashboard/:id/jobsubmit', function (req, res, next) {
	/*We look for a Employer by an ID
	 * Once we get that Employer we create a new Job object
	 * The info for the Job object is in the request body: req.body
	 * We then save that newly created Job object job.save
	 * We then push that new job into the jobs property of the Employer Object we found by ID at the beginning
	 * */
	Employer.findById(req.employer.id, function (err, employer) {
		if (err) {
			return res.status(404).json({
				title: 'An Error ocurred',
				error: err
			});
		}

		var job = new Job({
			jobTitle: req.body.job.jobTitle,
			jobDescription: req.body.job.jobDescription,
			employerName: req.body.job.employerName,
			employer: employer._id,
			employerLogo: req.body.job.employerLogo,
		});


		job.save(function (err, result) {

			if (err) {
				return res.status(404).json({
					title: 'An Error ocurred',
					error: err
				});
			}

			employer.jobs.push(job);
			employer.save();

			return res.status(201).json({
				message: 'Saved job',
				obj: result
			});
		})

	});


});

router.get('/employerDashboard/:id/employerHome/jobEdit/:id', function (req, res, next) {
	Job.find({_id: req.query.jobId}, function (err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			})
		}

		if (!doc) {
			return res.status(404).json({
				title: 'No user found',
				error: {message: 'User could not be found'}
			})
		}

		if (doc) {
			return res.status(200).json({
				message: 'Success',
				job: doc
			})
		}

	})
});

// When the employer updates their profile
router.patch('/updateProfile', function (req, res, next) {
	// console.log(req.body);

	Employer.findById(req.body.id, function (err, employer) {
		if(err){
			return res.status(404).json({
				title: 'An Error occured',
				error: err
			})
		};

		if(employer){
		}
    });

    res.status(200).json({
        message: 'Saved job'
    });
});

router.patch('/employerDashboard/:id/jobEdit/:jobId', function (req, res, next) {
	Job.findById(req.jobId._id, function (err, job) {
		if (err) {
			return res.status(404).json({
				title: 'An Error ocurred',
				error: err
			});
		}

		if (job) {
			job.jobDescription = req.body.job.jobDescription;
			job.jobTitle = req.body.job.jobTitle;
		}

		job.save(function (err, result) {
			if (err) {
				return res.status(500).json({
					title: "An error Occured",
					error: err
				})
			}
			;

			res.status(200).json({
				message: 'Saved job',
				obj: result
			});
		});
	})

});


module.exports = router;