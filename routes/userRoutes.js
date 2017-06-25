
var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var Employer = require('../models/employer');
var jwt = require('jsonwebtoken');
var Jobs = require('../models/jobs');
var User = require('../models/user');

// =============================
router.post('/dashboardinit', function (req, res) {
	
	User.findById(req.body.userId, function (err, userDoc) {
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
			
			let user ={
				id: userDoc._id,
				firstName: userDoc.firstName,
				lastName: userDoc.lastName,
				email: userDoc.email,
				accountType: userDoc.accountType,
				employer: userDoc.employer
			};
			
			/*TODO if the user has an employer id pull the employer out and send it along with the user object*/
			if(user.employer !== null){
				console.log("we have a registered employer for this user...");
			} else {
				console.log("there IS NO employer registered for this user...");
			}
			
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