var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var Employer = require('../models/employer');
var User = require('../models/user');
var Jobs = require('../models/jobs');
var Applicants = require('../models/applicants');


router.post('/', function (req, res, next) {
    console.log("inside the root login path with req:");
    console.log(req.body);
   User.query()
    res.status(201).json({
        message: 'user logged in!',
    });
});

module.exports = router;