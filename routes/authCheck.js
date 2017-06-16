// let express = require('express');

authCheck = (req, res, next) => {
	console.log("inside the auth check..");
	console.log("with req.url:", req.url);
	
	next();
};

module.exports = authCheck;