/**
 * Created by Rico on 9/20/16.
 */

/*These are the routes from express*/
 const express = require('express');
 const router = express.Router();
 const passwordHash = require('password-hash');
 const Employer = require('../models/employer');
 const Job = require('../models/jobs');
 const Applicants = require('../models/applicants');
 const User = require('../models/user');
 const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');

console.log("uploads requested..");
const uploadPath = path.join(__dirname, '..', '/public/assets/uploads');

const multerOpts = {
    fileFilter: function (req, file, next) {
        "use strict";
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto){
            console.log("it is a photo");
            next(null, true);
        } else {
            console.log("it is NOT  photo");
            next({message: "That filetype isn't allowed"}, false);
        }
    },
    storage: multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, uploadPath)
        },
        filename: function (req, file, cb) {
            let ext = path.extname(file.originalname);
            cb(null, `${Math.random().toString(36).substring(7)}${ext}`);
        }
    })
};

const upload = multer(multerOpts);

 const routeTools = require('./route_utils');

//requires an object with employerData and userId properties
router.post('/register', upload.single('file'), function (req, res, next) {

    User.findById(req.body.userId, function (error, user) {
		if(error){
			//TODO need to handle this error
			console.log(error);
		}

		if(!user){
			//TODO need to handle this error
			console.log("there was no  user with that id!", req.body.userId);
		}
		
		if(user){
			//we found a user, now create an employer and save it and save it's id
			// to the users employer property
			//using the employer model
            console.log("was there a file submitted with this user:", req.file);
			let employer = new Employer({
				name: req.body.name,
				logoImg: req.file !== undefined ? req.file.filename : '',
				location: {
					address: req.body.address,
					city: req.body.city,
					state: req.body.state,
					zip: req.body.zip
				},
				socialMedia:{
					website: req.body.website,
					twitter: req.body.twitter,
					facebook: req.body.facebook,
					linkedin: req.body.linkedin
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

                        let token = jwt.sign(localUser, process.env.SECRET_KEY, {expiresIn: "2 days"});

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