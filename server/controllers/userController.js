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
		console.log('LOAD ON LOGIN ROTUE!!!!!!');

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
						// console.log("Logcheck for employer:", response.employerId);
						let user = {
							_id: response.dataValues.id,
							firstName: response.dataValues.firstName,
							lastName: response.dataValues.lastName,
							email: response.dataValues.email,
							employerId: response.dataValues.employerId === undefined ? null : response.dataValues.employerId

						};

						let token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: "2 days"});

						res.status(200).json({
								user: user,
								employerId: user.employerId,
								token: token
							});
						}
					)
					.catch(err => console.log("userPromise error:", err));
			}
		});
	},

	login(req, res) {
		"use strict";
		console.log('LOGIN ROUTE!!!!!!!!!!');
		return JbUser
			.find({
				where: {
					email: req.body.email
				}
			})
			.then((userModel) => {
					// console.log('the response:', userModel);
					if (!userModel) {
						return Promise.reject("There was no user found.");
					}

					if (userModel.password !== req.body.password) {
						return Promise.reject("No matching user information found.");
					}

					let user = {
						_id: userModel.id,
						firstName: userModel.firstName,
						lastName: userModel.lastName,
						email: userModel.email,
						employerId: userModel.employerId === undefined ? null : userModel.employerId
					};

					let token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: "2 days"});
					// console.log("Logcheck for employer:", user.employerId);
					res.status(200).json({
						user: user,
						employerId: user.employerId,
						token: user
					});
				}
			)
			.catch(err => console.log("userPromise error:", err));
	},

	addEmployer(req, res, next) {
		"use strict";
		console.log("adding employer");
		console.log('employer bod:', req.body);
		//checking to see if we have a logoImg uploaded
		let filename = '';

		console.log('the req..', req.file);


		if (req.file !== undefined) {
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
				console.log("the employer created:", employer);
				return JbUser.update({employerId: employer.id},
					{
						where: {id: req.body.userId},
						returning: true,
						plain: true
					})
					.then((user) => {
						console.log("user has been updated with an employer..", user);
						let localUser = {
							employerId: user[1].employerId,
							firstName: user[1].firstName,
							lastName: user[1].lastName,
							email: user[1].email,
							_id: user[1].id
						};

						let localEmployer = {
							name: employer.name,
							logoImg: employer.logoImg,
							_id: employer.id,
							applicants: employer.applicants,
							jobs: employer.jobs,
							socialMedia: employer.socialMedia,
							location: employer.location,
						};

						let token = jwt.sign(localUser, process.env.SECRET_KEY, {expiresIn: "2 days"});

						res.status(200).json({
							token,
							employer: localEmployer,
							user: localUser
						});
					});
			})
			.catch((error) => {
				res.status(400).send(error);
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