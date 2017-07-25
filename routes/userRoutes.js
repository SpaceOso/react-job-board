const express = require('express');
const router = express.Router();
const passwordHash = require('password-hash');
const Employer = require('../models/employer');
const jwt = require('jsonwebtoken');
const Job = require('../models/jobs');
const User = require('../models/user');

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