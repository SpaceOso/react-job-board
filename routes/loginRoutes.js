var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var Employer = require('../models/employer');
var User = require('../models/user');
var Jobs = require('../models/jobs');
var Applicants = require('../models/applicants');


router.post('/', function (req, res, next) {
   
   User.findOne({email: req.body.email}, function (err, userDoc) {
       if(err){
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

       if(userDoc){
           if(userDoc.password === req.body.password){

               let user ={
                   _id: userDoc._id,
                   firstName: userDoc.firstName,
                   lastName: userDoc.lastName,
                   email: userDoc.email,
                   accountType: userDoc.accountType,
                   employerId: userDoc.employerId
               };

               if(user.employerId === undefined || user.employerId === null || user.employerId === "null"){
                   console.log("This user does NOT have a registered employer");
                   let token = jwt.sign(user, process.env.secretkey, {expiresIn: "2 days"});

                   res.status(200).json({
                       token,
                       user
                   })

               } else {
                   Employer.findById(user.employerId, function(err, employerDoc){
                       if(err){
                           console.log("there was an error retriveing the employer for this user")
                       }

                       if(employerDoc){

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
        
        if(err){
            res.status(401).json({
                message: "invalid credentials"
            })
        }
        
       if(decoded){
            console.log("token has been verified and the user is:", decoded);
	       res.status(200).json({
		       message: "token is valid",
		       user: decoded
	       })
       }
    });
});


module.exports = router;