const JbUser = require('../models').JbUser;
const Employer = require('../models').Employer;
const Applicants = require('../models').Applicants;
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
				homePhone: req.body.homePhone,
				cellPhone: req.body.cellPhone,
				resume: req.body.resume,
				coverLetter: req.body.coverLetter,
                jobId: req.body.jobId,
				employerId: req.body.employerId
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