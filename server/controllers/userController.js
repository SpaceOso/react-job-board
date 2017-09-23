const JbUser = require('../models').JbUser;
const Employer = require('../models').Employer;
let uuid = require('uuid');
let jwt = require('jsonwebtoken');

module.exports = {
    create(req, res) {
        "use strict";
        console.log("user created");
        // console.log("user information:", req.body);
        return JbUser
            .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            })
            .then((user) => {
        	    console.log("user created:", user);
	            //TODO need to set up proper secret key
	            let userSignature = {
		            firstName: user.firstName,
		            lastName: user.lastName,
		            email: user.email,
		            employerId: null,
		            _id: user.id
	            };

	            let token = jwt.sign(userSignature, process.env.SECRET_KEY, {expiresIn: "1 day"});

	            res.status(201).json({
		            user: userSignature,
		            token
	            });
            })
            .catch((error) => {
                res.status(400).send(error);
            })
    },

	loadOnLogin(req, res) {
		"use strict";
		console.log('loadOnLogin requested.');

		let token = req.body.token;
		jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {

			if (err) {
				return res.status(401).json({
					message: "invalid credentials on reload."
				})
			}

			if (decoded) {
				return JbUser
					.findById(decoded._id)
					.then((response) => {
							console.log('the response:', response);
							let token = jwt.sign(response, process.env.SECRET_KEY, {expiresIn: "2 days"});
							console.log("Logcheck for employer:", response.employerId);
							res.status(200).json({
								user: response.user,
								employerId: response.employerId,
								token: token
							});
						}
					)
					.catch(err => console.log("userPromise error:", err));
			}
		});
	},

    addEmployer(req, res) {
        "use strict";
        console.log("adding employer");
        console.log('employer bod:', req.body);
        //checking to see if we have a logoImg uploaded
	    let filename = '';

	    if(req.file !== undefined) {
		    if (req.file.key !== undefined) {
			    console.log('key:', req.file.key);
			    filename = req.file.key;
		    }

		    if (req.file.filename !== undefined) {
			    console.log('req.file.filename', req.file.filename);
			    filename = req.file.filename;
		    }
	    }

	    console.log("filename", filename);

		    return Employer
            .create({
                name: req.body.name,
	            logoImg: filename,
	            location: {
	                address: req.body.address,
	                city: req.body.city,
	                state: req.body.state,
	                zip: req.body.zip
                },
	            website: req.body.website,
	            twitter: req.body.twitter,
	            facebook: req.body.facebook,
	            linkedIn: req.body.linkedIn
            })
            .then((employer) => {
                JbUser.update({employerId: employer.id},
                    {
                        where: {id: req.body.userId},
                        returning: true,
                        plain: true
                    })
                    .then((user) => {
                        console.log("user has been updated with an employer..", user);
                        res.status(201).send(employer);
                    });
            })
            .catch((error) => {
                console.log(error);
            });

    },

    list(req, res) {
        "use strict";
        return JbUser
            .findAll({include: [{model: Employer}]})
            .then(users => {
                res.status(201).send(users)
            })
            .catch((error) => {
                res.status(400).send(error);
                console.log("error getting users:", error);
            })
    }
};


/* addEmployer(req, res) {
        "use strict";
        console.log("adding employer");
        return Employer
            .create({
                name: req.body.name,
                location: req.body.location,
                employerId: req.body.userId
            })
            .then((employer) => {
                JbUser.update({employerId: employer.id},
                    {
                        where: {id: req.body.userId},
                        returning: true,
                        plain: true
                    })
                    .then((user) => {
                        console.log("user has been updated with an employer..", user);
                        res.status(201).send(employer);
                    });
            })
            .catch((error) => {
                console.log(error);
            });

    },*/