const JbUser = require('../models').JbUser;
const Employer = require('../models').Employer;
const Applicants = require('../models').Applicants;
let uuid = require('uuid');

module.exports = {
    create(req, res) {
        "use strict";
        console.log("user created");
        // console.log("user information:", req.body);
        return Applicants
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                jobsApplied: req.body.jobId,
            })
            .then((applicant) => {
                console.log('applicant created:', applicant);
                res.status(201).send(applicant);
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