// let express = require('express');

authCheck = (req, res, next) => {
	
	let token;
	console.log("inside the auth check..");
	if(req.header('Authorization')){
		console.log("checking token");
		//we only set this token once we verify the token is valid when the user signs in.
		token = req.header('Authorization').split(' ')[1];
	}

	console.log("inside second check in authcheck");
	
	if(token){
		console.log("toking is clear you are now moving forward");
		next();
	}else{
		res.render('index',{error: 'you need to login before proceeded'})
	}
};

module.exports = authCheck;