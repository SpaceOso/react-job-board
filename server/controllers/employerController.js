const Employer = require('../models').Employer;
const Job = require('../models').Job;
const Applicants = require('../models').Applicants;
const JobApplications = require('../models').JobApplications;
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
                location: {
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip
                },
                description: req.body.description,
                employerId: req.body.employerId.id
            })
            .then((job) => {
                job.dataValues.Applicants = [];
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
        console.log("getting jobs");

        return Employer
            .findById(req.params.employerId)
            .then(employer => {
                return employer.getJobs({
                    include: [Applicants]
                })
                    .then(jobs => {
                        console.log("the jobs:", jobs);
                        res.status(201).send(jobs);
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(400).send(error);
                    })

            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)
            });
    },

    updateApplicantStatus(req,res){
        console.log("inside the employer controller with:");
        console.log(req.body);
        console.log(res);
        res.status(201).send("you got here ok");
    }
};