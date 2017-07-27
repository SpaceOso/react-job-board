var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var Employer = require('../models/employer');
var User = require('../models/user');
var Jobs = require('../models/jobs');
var Applicants = require('../models/applicants');

function findEmployerById(employerId){
    // let employer = {};
    return Employer.findById(employerId, function (err, employerDoc) {
        if (err) {
            console.log("there was an error retriveing the employer for this user")
        }

        console.log("this user does have an employer");
        if (employerDoc) {

            employer = {
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

function findUserById(decoded) {
    console.log("findUserByID");
    User.findById('fffk')
        .exec()
        .then(data => console.log("then step:", data))
        .catch(error => console.log("error", error));

    /*
    User.findById(decoded._id, function (err, userDoc) {
        if (err) {
            console.log(err);
        }

        if (userDoc) {

            console.log("found a userDoc");
            let user = {
                _id: userDoc._id,
                firstName: userDoc.firstName,
                lastName: userDoc.lastName,
                email: userDoc.email,
                employerId: userDoc.employerId === undefined ? null : userDoc.employerId
            };

            console.log('func, we found a user:', user);
            if (user.employerId === undefined || user.employerId === null) {
                console.log("This user does NOT have a registered employer");
                let token = jwt.sign(user, process.env.secretkey, {expiresIn: "2 days"});

                return {
                    token,
                    user
                }

            } else {
                // let employer = findEmployerById(user.employerId);

                const emp = new Promise(function (resolve, reject) {
                    resolve(findEmployerById(user.employerId));
                });

                emp.then(data => { console.log('resolve rr', data)});
                // console.log("we found an employer and it is:", employer);
            }
        } else {
            return {
                message: "Invalid credentials"
            }
        }

    })
    */
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
    console.log("loginRoutes: /logcheck");
    let token = req.body.token;

    jwt.verify(token, process.env.secretkey, function (err, decoded) {

        if (err) {
            console.log("error verifying token");
            res.status(401).json({
                message: "invalid credentials"
            })
        }

        if (decoded) {
            console.log("token has been verified and the user is:", decoded);
            // let logInInfo = findUserByEmailSetEmployer(decoded.email);
            findUserById(decoded);
            //TODO now need to create a user object, check if it has a register employer
            //TODO and if it does add it to the user object, we already have this function somehwere

        }
    });
});


module.exports = router;