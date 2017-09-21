const Job = require('../models').Job;
const Applicants = require('../models').Applicants;

module.exports = {
    create(req, res){
        "use strict";
        console.log("job created");
        return Job
            .create({
                title: req.body.title,
                description: req.body.description,
                employerId: req.body.employerId
            })
            .then((job) => {
                console.log(job);
                res.status(201).send(job);
            })
            .catch((error) => res.status(400).send(error))
    },

    list(req, res){
        "use strict";
        console.log("job listed");
        return Job
            .findAll({include:[{model: Applicants}]})
            .then((jobs) => {
                console.log("jobs have been found");
                res.status(201).send(jobs);
            })
            .catch((error) => res.status(201).send(error));
    }
};