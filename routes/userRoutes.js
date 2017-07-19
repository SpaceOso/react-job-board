const express = require('express');
const router = express.Router();
const passwordHash = require('password-hash');
const Employer = require('../models/employer');
const jwt = require('jsonwebtoken');
const Job = require('../models/jobs');
const User = require('../models/user');

// =============================
/*This gets called when we first arrive at the user dashboard*/
/*TODO need to populate the job posts for the employer*/
router.post('/dashboardinit', function (req, res) {

	User.findById(req.body.userId, function (err, userDoc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			})
		}
		
		if (!userDoc) {
			return res.status(401).json({
				title: 'No user found',
				error: {message: 'User could not be found'}
			})
		}
		
		if (userDoc) {

			let user = {
				id: userDoc._id,
				firstName: userDoc.firstName,
				lastName: userDoc.lastName,
				email: userDoc.email,
				accountType: userDoc.accountType,
				employerId: userDoc.employer
			};
			
			if (user.employer !== null) {
				console.log("we have a registered employer for this user...");
				console.log("id..", userDoc.employer);
				
				userDoc.populate('employer', function (err, doc) {
					if (err) {
						console.log("we couldn't se the employer...");
					}
					
					if (doc) {
						console.log('we found the employer doc...', doc);
						
						let token = jwt.sign({user: user}, process.env.secretkey, {expiresIn: 7200});
						
						let employer = doc.employer;

						/*TODO this needs to check if the employer has jobs*/
						if(employer.jobs.length > 0){
							console.log('THE EMPLOYER DID HAVE JOB POSTS SO WE ARE POPULATING THEM');
                            employer.populate('jobs', function (err, jobs) {

                                if(err){
                                    console.log("there was an error populating the jobs");
                                }

                                if(jobs){
                                    console.log("The user right before we send it...", user);
                                    console.log("The employer right before we send it...", employer);
                                    res.status(200).json({
                                        message: 'User has registered employer',
                                        token,
                                        user,
                                        employer
                                    })
                                }
                            })
						} else {
							/*This will run if the employer did not have any jobs*/
							console.log("the employer did not have any jobs so we are not going to bother populating them");
                            console.log("The user right before we send it...", user);
                            console.log("The employer right before we send it...", employer);
                            res.status(200).json({
                                message: 'User has registered employer',
                                token,
                                user,
                                employer
                            })
                        }
					}
				});
				
			} else {
				
				console.log('RUNNING THIS ************************');
				let token = jwt.sign({user: user}, process.env.secretkey, {expiresIn: 7200});
				
				res.status(200).json({
					message: 'User does not have a registered employer',
					token,
					user
				})
			}
		}
		
	});
});

// =============================
/*This will handle the user creating a job.
* req.body = {
* 	employerId,
* 	jobTitle,		//required string
* 	jobDescription,	//required string
* 	keywords 		//optional array, currently
* 	}
* 	*/
router.post('/dashboard/:id/createjob', function (req, res) {
	console.log("inside the create job back end...");
	console.log("you have the following job..");
	console.log(req.body);

	/*Need to use req.body.employerId to find the employer, create a job and add it to the job array.*/

    Employer.findById(req.body.employerId, function (err, employer) {

        if (err) {
            return res.status(404).json({
                title: 'An Error Occured, could not find employer.',
                error: err
            });
        }

        console.log("the employer object:", employer);

        let job = new Job({
            jobTitle: req.body.jobTitle,
            jobDescription: req.body.jobDescription,
            employerName: employer.name,
            employerId: employer._id,
            employerLogo: employer.logoImg,
			applicants: [],
        });


        job.save(function (err, result) {

        	console.log("saving the job now");

            if (err) {
                console.log("the error is..", err);
                return res.status(404).json({
                    title: 'An Error ocurred',
                    error: err
                });
            }

            employer.jobs.push(job);
            employer.save();

            console.log("job is saved...", result);

            return res.status(201).json({
                message: 'Saved job',
                obj: result
            });
        })

    });

});

module.exports = router;