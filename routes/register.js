let express = require('express');
let router = express.Router();
let passwordHash = require('password-hash');

let User = require('../models/user');

router.get('/',function (req, res) {
    console.log("inside the register path");
    res.status(200).json({
        message: "you made it here safely"
    })
});

router.post('/', function (req, res, next) {
    console.log("you're in the post section with the following request");
    console.log(req.body);
	
    let user = new User({
	    firstName: req.body.fName,
	    lastName: req.body.lName,
	    email: req.body.email,
	    password: req.body.password,
	    employer: '33',
	    accountType: 'fe'
    });

	
	console.log(user);
	
	user.save(function (err, result) {
		
		if (err) {
			console.log('found an error...');
			console.log(err);
			return res.status(404).json({
				title: 'An Error ocurred',
				error: err
			});
		};
		
		console.log("a result:", result);
		res.status(201).json({
			message: 'Saved user',
			obj: result
		});
		
	})
	

});

module.exports = router;