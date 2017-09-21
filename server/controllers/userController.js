const JbUser = require('../models').JbUser;
const Employer = require('../models').Employer;
let uuid = require('uuid');

module.exports = {
    create(req, res) {
        "use strict";
        console.log("user created");
        // console.log("user information:", req.body);
        return JbUser
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            })
            .then((job) => {
                console.log(Object.keys(employer.rawAttributes));
                res.status(201).send(job);
            })
            .catch((error) => {
                res.status(400).send(error);
            })
    },

    addEmployer(req, res) {
        "use strict";
        console.log("adding employer");
        return Employer
            .create({
                name: req.body.name,
                location: req.body.location,
                employerId: req.body.userId
            })
            .then((employer) => {
                JbUser.update({employerId: employer.id},
                    {
                        where: {id: req.body.userId},
                        returning: true,
                        plain: true
                    })
                    .then((user) => {
                        console.log("user has been updated with an employer..", user);
                        res.status(201).send(employer);
                    });
            })
            .catch((error) => {
                console.log(error);
            });

    },

    list(req, res) {
        "use strict";
        return JbUser
            .findAll({include: [{model: Employer}]})
            .then(users => {
                res.status(201).send(users)
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log("error getting users:", error);
            })
    }
};