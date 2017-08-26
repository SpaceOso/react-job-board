let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let passwordHash = require('password-hash');

let User = require('../models/user');

router.post('/', function (req, res, next) {

	console.log("in register post /:", req.body);

    let user = new User({
	    firstName: req.body.fName,
	    lastName: req.body.lName,
	    email: req.body.email,
	    password: req.body.password, //TODO need to hash this
	    employerId: null
    });
	
	user.save(function (err, result) {
		if (err) {
			return res.status(404).json({
				title: 'An Error ocurred',
				error: err
			});
		};

		
		
		/*result: { __v: 0,
		 firstName: '***',
		 lastName: '**',
		 email: '**',
		 password: '**',
		 employer: null,
		 accountType: 'user',
		 _id: **** }
		 */

		//TODO need to set the employer property so react knows it's not there
		console.log("When registering new user the result after we save it is:", result);
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