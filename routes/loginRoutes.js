let express = require('express');
let router = express.Router();

let jwt = require('jsonwebtoken');

let Employer = require('../models/employer');
let User = require('../models/user');
let Jobs = require('../models/jobs');
let Applicants = require('../models/applicants');

/**
 * Returns all the info needed by the front end for the User model.
 * @param {object} userDoc - The user model retrieved from the database.
 * @return {object} userObject - The user model as required by the front end.
 */
function returnUserObject(userDoc) {
    "use strict";
    let user = {
        _id: userDoc._id,
        firstName: userDoc.firstName,
        lastName: userDoc.lastName,
        email: userDoc.email,
        employerId: userDoc.employerId === undefined ? null : userDoc.employerId
    };

    return user;
}

/**
 *
 * @param employerDoc {object} - The employer model retrieved from the database.
 * @return {object} employerObject - The employer model as required by the front end.
 */
function returnEmployerObject(employerDoc) {
    "use strict";
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

function findEmployerById(employerId) {
    return Employer.findById(employerId)
        .exec()
        .then(employerDoc => {
            if (!employerDoc) {
                return Promise.reject("There was no employer found with that ID");
            }
            return returnEmployerObject(employerDoc);
        })
        .then(employerModel => employerModel);
}

function returnUserByEmail(userEmail) {
    return User.findOne({email: userEmail})
        .exec()
        .then(userDoc => {
            // console.log("returnUserByEmail:",userDoc);
            // let localUser = returnUserObject(userDoc)
            return returnUserObject(userDoc);
        })
        .then(user => {
            console.log("return by email promise:", user);
            return user;
        })
        .catch(err => console.log(err));
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

            let user = returnUserObject(userDoc);

            if (userDoc.employerId === null) {

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



router.post('/logcheck', function (req, res) {

    let token = req.body.token;

    jwt.verify(token, process.env.secretkey, function (err, decoded) {

        if (err) {
           return res.status(401).json({
                message: "invalid credentials on reload."
            })
        }

        if (decoded) {
            findUserById(decoded._id)
                .then(
                    response => {
                        let token = jwt.sign(response.user, process.env.secretkey, {expiresIn: "2 days"});
                        console.log("Logcheck for employer:", response.employer);
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

router.post('/', function (req, res) {
    console.log("loginRoutes root /");

    User.findOne({email: req.body.email})
        .exec()
        .then(userDoc => {

            if (!userDoc) {
                return Promise.reject("There was no user found.");
            }

            if (userDoc.password !== req.body.password) {
                return Promise.reject("No matching user information found.");
            }

            return returnUserObject(userDoc);

        })
        .then(user => {
            console.log("The final promises from route post /", user);
            if (user.employerId === null) {
                let token = jwt.sign(user, process.env.secretkey, {expiresIn: "2 days"});

                return res.status(200).json({
                    token,
                    user
                })
            } else {
                return findEmployerById(user.employerId)
                    .then(employer => {

                        let token = jwt.sign(user, process.env.secretkey, {expiresIn: "2 days"});

                        console.log("employer we're going to send back:", employer);

                        return res.status(200).json({
                            token,
                            user,
                            employer
                        });
                    })
            }

        })
        .catch(errorMessage => {
            console.log("error login in:", errorMessage);
            //TODO could send status out when we finalize this function right now it crashes because we send headers
            //again right below
            res.status(401).json({
                errorMessage
            });
        });

});
module.exports = router;