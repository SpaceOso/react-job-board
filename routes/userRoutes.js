/**
 * Created by Rico on 12/5/2016.
 */

var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var Employer = require('../models/employer');
var jwt = require('jsonwebtoken');
var Jobs = require('../models/jobs');
var User = require('../models/user');


// =============================
router.get('/userRegister', function (req, res, next) {
    console.log("userRegister");
});
// =============================
router.get('/userLogin', function (req, res, next) {
    //look up user based on the email provided int he login component
    User.findOne({email: req.query.email}, function (err, user) {
        //if there was some error
        //TODO make this work without app crashing
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            })
        }

        //in case no user was found based on the email
        //TODO make this work without app crashing
        if (!user) {
            return res.status(404).json({
                title: 'No user found',
                error: {message: 'User could not be found'}
            })
        }

        //check the user typed in the correct password
        //TODO make this work without app crashing
        if (!passwordHash.verify(req.query.password, user.password)) {

            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }

        /*if there were no errors create a token and send
         * it to the front end along with a user object*/
        // let token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        // res.status(200).json({
        //     message: 'Success',
        //     token: token,
        //     user: user
        // })
    })
        .populate('jobsApplied')
        .exec(function(error, user){
            let token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
            res.status(200).json({
                message: 'Success',
                token: token,
                user: user
            })
        });
});
// =============================
router.get('/', function (req, res, next) {

    User.findById(req.query.userID, function (err, docs) {
        if (err) {
            return res.status(404).json({
                title: 'An Error ocurred',
                error: err
            });
        }

        //create array to store jobApplied ids
        // var appliedJobID = docs.jobsApplied;


        // //search for the jobs this user has applied to
        // Jobs.find({
        //     '_id': {$in: appliedJobID}
        // }, function (err, jobs) {
        //
        //     res.status(200).json({
        //         message: 'Success',
        //         appliedJobs: jobs,
        //         obj: docs
        //     });
        // });

        res.status(200).json({
            message: 'Succes',
            userName: "rico",
            obj: "what is this"
        })

    });
});
// =============================
router.post('/userRegister', function (req, res, next) {

    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cellPhone: req.body.cellPhone,
        homePhone: req.body.homePhone,
        email: req.body.email,
        userName: req.body.userName,
        password: passwordHash.generate(req.body.password),
        location: {
            address: req.body.location.address,
            city: req.body.location.city,
            state: req.body.location.state,
            zipCode: req.body.location.zipCode
        },
        uploads: req.body.uploads,
        jobsApplied: req.body.jobsApplied
    });

    user.save(function (err, result) {
        if (err) {
            return res.status(404).json({
                title: 'An Error ocurred',
                error: err
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});

        res.status(201).json({
            message: 'Saved user',
            token: token,
            obj: result
        });
    });

});

module.exports = router;