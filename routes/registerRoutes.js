let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let passwordHash = require('password-hash');

let User = require('../models/user');

router.post('/', function (req, res, next) {
    console.log("you're in the post section with the following request");
    console.log(req.body);
	
    let user = new User({
	    firstName: req.body.fName,
	    lastName: req.body.lName,
	    email: req.body.email,
	    password: req.body.password, //TODO need to hash this
	    employer: null,
	    accountType: req.body.accountType
    });
	
	user.save(function (err, result) {
		console.log("Trying to save a user");
		if (err) {
			console.log('found an error...');
			console.log(err);
			return res.status(404).json({
				title: 'An Error ocurred',
				error: err
			});
		};

		
		
		console.log("a result:", result);
		/*result: { __v: 0,
		 firstName: '***',
		 lastName: '**',
		 email: '**',
		 password: '**',
		 employer: null,
		 accountType: 'user',
		 _id: **** }
		 */
		
		let userSignature = {
			firstName: result.firstName,
			lastName: result.lastName,
			email: result.email,
			employer: result.employer,
			accountType: result.accountType,
			userId: result._id
		};
		
		//TODO need to set up proper secret key
		let token = jwt.sign(userSignature, process.env.secretkey, {expiresIn: "1 day"});
		
		
		res.status(201).json({
			user: userSignature,
			token: token
		});
		
	})
	

});

module.exports = router;