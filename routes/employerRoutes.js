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
 let User = require('../models/user');
 let jwt = require('jsonwebtoken');

 let routeTools = require('./route_utils');

//requires an object with employerData and userId properties
router.post('/register', function (req, res, next) {
	User.findById(req.body.userId, function (error, user) {
		
		if(error){
			console.log(error);
		}
		

		if(!user){
			console.log("there was no  user with that id!", req.body.userId);
		}
		
		if(user){
			//we found a user, now create an employer and save it and save it's id
			// to the users employer property
			//using the employer model
			
			let employer = new Employer({
				name: req.body.employerData.name,
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


			employer.save(function(err, employer){
				if(err){
					console.log(err);
				}
				
				if(employer){
					user.employerId = employer._id;
					
					user.save(function(error, user){
						if(error){
							console.log("something went wrong saving employer")
						}
						
						let localUser = {
							employerId: user.employerId,
							firstName: user.firstName,
							lastName: user.lastName,
							email: user.email,
							_id: user._id
						};

						let localEmployer = {
							name: employer.name,
							logoImg: employer.logoImg,
							_id: employer._id,
							applicants: employer.applicants,
							jobs: employer.jobs,
							socialMedia: employer.socialMedia,
							location: employer.location,
						};

                        let token = jwt.sign(localUser, process.env.secretkey, {expiresIn: "2 days"});

                        res.status(200).json({
                            token,
                            employer: localEmployer,
                            user: localUser
                        });
					})
				}
			})
		}
    })

});

router.get('/dashboard/:employerId/getAllJobs',function (req, res) {
	"use strict";
	console.log(req.params.employerId);
	Employer.findById(req.params.employerId)
		.populate('jobs')
		.exec()
		.then(employerDoc => {
			if(!employerDoc){
				return Promise.reject("Employer error! No employer with that ID!");
			}

			return routeTools.returnEmployerObject(employerDoc);
		})
		.then(employerModel => {
			res.status(200).json({
				employerModel,
				message: "here's the employer model"
			})
		})
		.catch(err => {
			console.log(err);
			res.status(404).json({errorMessage: err});
        });
	// res.status(200).json({message: "you've made it to the jobs."});

});

module.exports = router;