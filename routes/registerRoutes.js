let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let passwordHash = require('password-hash');

let User = require('../models/user');

router.post('/', function (req, res, next) {

	console.log('in the back end we get:', req.body);
    let user = new User({
	    firstName: req.body.firstName,
	    lastName: req.body.lastName,
	    email: req.body.email,
	    password: req.body.password, //TODO need to hash this
	    employerId: null
    });

	user.save(function (err, result) {
		if (err) {
			console.log("there was an error saving:", err);
			//TODO need to send an error this was returning as path not found
			return res.status(404).json({
				title: 'An Error ocurred',
				error: err
			});
		}

		//TODO need to set the employer property so react knows it's not there
		let userSignature = {
			firstName: result.firstName,
			lastName: result.lastName,
			email: result.email,
			employerId: null,
			_id: result._id
		};

		//TODO need to set up proper secret key
		let token = jwt.sign(userSignature, process.env.SECRET_KEY, {expiresIn: "1 day"});

		res.status(201).json({
			user: userSignature,
			token
		});
		
	})
	

});

module.exports = router;