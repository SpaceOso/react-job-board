var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var Employer = require('../models/employer');
var User = require('../models/user');
var Jobs = require('../models/jobs');
var Applicants = require('../models/applicants');
/**
 * Returns all the info needed by the front end for the User model.
 * @param {object} userDoc - The user model retrieved from the database.
 * @return {object} userObject - The user model as required by the front end.
 */
function returnUserObject(userDoc){
    "use strict";
    return user = {
        _id: userDoc._id,
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        email: userDoc.email,
        employerId: userDoc.employerId === undefined ? null : userDoc.employerId
    };
}

/**
 *
 * @param employerDoc {object} - The employer model retrieved from the database.
 * @return {object} employerObject - The employer model as required by the front end.
 */
function returnEmployerObject(employerDoc){
    "use strict";
    return employer = {
        logoImg: employerDoc.logoImg,
        name: employerDoc.name,
        applicants: employerDoc.applicants,
        jobs: employerDoc.jobs,
        socialMedia: employerDoc.socialMedia,
        location: employerDoc.location,
        _id: employerDoc._id
    };
}

function findEmployerById(employerId){
    // let employer = {};
    return Employer.findById(employerId, function (err, employerDoc) {
        if (err) {
            console.log("there was an error retriveing the employer for this user")
        }

        console.log("this user does have an employer");
        if (employerDoc) {

           let employer = {
                logoImg: employerDoc.logoImg,
                name: employerDoc.name,
                applicants: employerDoc.applicants,
                jobs: employerDoc.jobs,
                socialMedia: employerDoc.socialMedia,
                location: employerDoc.location,
                _id: employerDoc._id
            };

           return employer;
        }
    });
    // return employer;
}

/**
 *
 * @param {string} userId - The user._id to search user by.
 * @return {Promise|Promise.<T>}
 */
function findUserById(userId) {
    return User.findById(userId)
        .exec()
        .then(userDoc => {

            let user = {
                _id: userDoc._id,
                firstName: userDoc.firstName,
                lastName: userDoc.lastName,
                email: userDoc.email,
                employerId: userDoc.employerId === undefined ? null : userDoc.employerId
            };

            if(userDoc.employerId === null){

                return {user};

            } else {

                return Employer.findById(user.employerId)
                    .exec()
                    .then(employerDoc => {
                        "use strict";
                        return {user: user, employer: employerDoc}
                    })
                    .catch(err => console.log("we couldn't find an employer for that user"))
            }
        })
        .catch(error => console.log("error", error));
}

router.post('/', function (req, res, next) {
    console.log("loginRoutes root /");
    User.findOne({email: req.body.email}, function (err, userDoc) {
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
            if (userDoc.password === req.body.password) {

                let user = {
                    _id: userDoc._id,
                    firstName: userDoc.firstName,
                    lastName: userDoc.lastName,
                    email: userDoc.email,
                    employerId: userDoc.employerId === undefined ? null : userDoc.employerId
                };

                console.log("and now the user is:", user);

                if (user.employerId === undefined || user.employerId === null) {
                    console.log("This user does NOT have a registered employer");
                    let token = jwt.sign(user, process.env.secretkey, {expiresIn: "2 days"});

                    res.status(200).json({
                        token,
                        user
                    })

                } else {
                    Employer.findById(user.employerId, function (err, employerDoc) {
                        if (err) {
                            console.log("there was an error retriveing the employer for this user")
                        }

                        if (employerDoc) {

                            let employer = {
                                logoImg: employerDoc.logoImg,
                                name: employerDoc.name,
                                applicants: employerDoc.applicants,
                                jobs: employerDoc.jobs,
                                socialMedia: employerDoc.socialMedia,
                                location: employerDoc.location,
                                _id: employerDoc._id
                            };

                            let token = jwt.sign(user, process.env.secretkey, {expiresIn: "2 days"});
                            console.log("employer we're going to send back:", employer);

                            res.status(200).json({
                                token,
                                user,
                                employer
                            });

                        }
                    })
                }
            } else {
                res.status(401).json({
                    message: "Invalid credentials"
                })
            }
        }
    });

});

router.post('/logcheck', function (req, res) {

    let token = req.body.token;

    jwt.verify(token, process.env.secretkey, function (err, decoded) {

        if (err) {
            res.status(401).json({
                message: "invalid credentials"
            })
        }

        if (decoded) {
            let userPromise = findUserById(decoded._id);

            userPromise
                .then(
                    response => {

                        let token = jwt.sign(response.user, process.env.secretkey, {expiresIn: "2 days"});

                        res.status(200).json({
                            user: response.user,
                            employer: response.employer,
                            token: token
                        });
                    }
                )
                .catch(err => console.log("userPromise error:", err));
        }
    });
});


module.exports = router;