/**
 * Created by Rico on 9/1/16.
 */
var express = require('express');
var router = express.Router();
var Employer = require('../models/employer');
var Jobs = require('../models/jobs');
let homeControllers = require('../controllers/homeController');
// var User = require('../models/user');


router.get('/homeload', homeControllers.homeLoad);

router.get('/home', function (req, res, next) {
	console.log('TRYING TO LOAD HOME');
/*
    if (req.body.id == undefined) {

        // console.log('check passed');

        Employer.find()
            .exec(function (err, docs) {
                if (err) {
                    return res.status(404).json({
                        title: 'An Error ocurred',
                        error: err
                    });
                }

                res.status(200).json({
                    message: 'Success',
                    obj: docs
                });
            });

    }*/
});

router.get('/', homeControllers.loadIndex);


module.exports = router;