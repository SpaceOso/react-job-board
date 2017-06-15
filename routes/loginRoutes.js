var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var Employer = require('../models/employer');
var User = require('../models/user');
var Jobs = require('../models/jobs');
var Applicants = require('../models/applicants');


router.post('/', function (req, res, next) {
    console.log("inside the root login path with req:");
    console.log(req.body);
    
   User.findOne({email: req.body.email}, function (err, userDoc) {
       if(err){
           console.log("there was an error finding the user");
           return res.status(404).json({
               title: 'An error occurred',
               error: err
           })
       }
       if (!userDoc) {
           console.log('there was no user found with those credentials');
           return res.status(401).json({
               title: 'No user found',
               error: {message: 'User could not be found'}
           })
       }

       if(userDoc){
           console.log('we found the user!');
           if(userDoc.password === req.body.password){
               console.log("WE MATCHED THE USER!!");
               console.log(userDoc);

               let user ={
                   id: userDoc._id,
                   firstName: userDoc.firstName,
                   lastName: userDoc.lastName,
                   email: userDoc.email,
                   accountType: userDoc.accountType,
                   employer: userDoc.employer
               };


               let token = jwt.sign({user: user}, process.env.secretkey, {expiresIn: 7200});
               
               res.status(200).json({
                   message: 'Success',
                   token,
                   user
               })
           } else {
               console.log("passwords do not match!!");
               res.status(401).json({
                   message: "Invalid credentials"
               })
           }
       }
   });

});

router.post('/logcheck', function (req, res) {
    console.log("you must've just refreshed to be here..");
    // console.log(req.body.token);
    
    let token = req.body.token;
    
    console.log("token..", token);
    jwt.verify(token, process.env.secretkey, function (err, decoded) {
        
        if(err){
            res.status(401).json({
                message: "invalid credentials"
            })
        }
        
        console.log("no errors..");
       if(decoded){
       	console.log('decoded', decoded.user);
	       res.status(200).json({
		       message: "token is valid",
		       user: decoded.user
	       })
       }
    });
});

router.post('/dashboardinit', function (req, res) {
    console.log('inside the dashboardinit call with:', req.body.userId);
	
	User.findById(req.body.userId, function (err, userDoc) {
		if(err){
			console.log("there was an error finding the user");
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			})
		}
		if (!userDoc) {
			console.log('there was no user found with those credentials');
			return res.status(401).json({
				title: 'No user found',
				error: {message: 'User could not be found'}
			})
		}
		
		if(userDoc){
   
			let user ={
				id: userDoc._id,
				firstName: userDoc.firstName,
				lastName: userDoc.lastName,
				email: userDoc.email,
				accountType: userDoc.accountType,
				employer: userDoc.employer
			};
			
			let token = jwt.sign({user: user}, process.env.secretkey, {expiresIn: 7200});
			
			res.status(200).json({
				message: 'Success',
				token,
				user
			})
        }
	});
});


module.exports = router;