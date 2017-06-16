// let express = require('express');

authCheck = (req, res, next) => {
	console.log("inside the auth check..");
	console.log("with req.url:", req.url);
	
	let token;
	
	if(req.header('Authorization')){
		token = req.header('Authorization').split(' ')[1];
	}
	
	console.log("this is what we got...", token);
	
	if(token){
		console.log("you're free to move on! You've been auth!!");
		next();
	}else{
		console.log('STOP IT RIGHT THERE!! YOU NEED TO SIGN IN BEFORE YOU CAN PROCEED!!!');
		res.status(401).json({
			message: "You need to login before you can proceed!! from server"
		})
	}
};

module.exports = authCheck;