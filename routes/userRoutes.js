var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var Employer = require('../models/employer');
var jwt = require('jsonwebtoken');
var Job = require('../models/jobs');
var User = require('../models/user');

// =============================
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
				employer: userDoc.employer
			};
			
			/*TODO if the user has an employer id pull the employer out and send it along with the user object*/
			if (user.employer !== null) {
				console.log("we have a registered employer for this user...");
				console.log("id..", userDoc.employer);
				
				userDoc.populate('employer', function (err, doc) {
					if (err) {
						console.log("we couldn't se the employer...");
					}
					
					if (doc) {
						console.log('we found the employer...', doc);
						
						let token = jwt.sign({user: user}, process.env.secretkey, {expiresIn: 7200});
						
						let employer = doc.employer;
						
						console.log("The user right before we send it...", user);
						res.status(200).json({
							message: 'User has registered employer',
							token,
							user,
							employer
						})
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
            employer: employer._id,
            employerLogo: employer.emmployerLogo,
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