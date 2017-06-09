/**
 * Created by Rico on 9/1/16.
 */
var express = require('express');
var router = express.Router();
var Employer = require('../models/employer');
var Jobs = require('../models/jobs');
// var User = require('../models/user');

console.log("in the root app");

router.get('/homeload', function (req, res, next) {

    Jobs.find({})
        .sort({createdAt: -1})
        // .limit(10)
        .populate("employer")
        .exec(function(error, doc){
            // console.log(JSON.stringify(doc, null, "\t"))
            res.status(200).json({
                message: 'Success',
                jobs: doc
            })
        });




    // Jobs.find(function (err, doc) {
    //     if (err) {
    //         res.status(404).json({
    //             title: 'An error occurred',
    //             error: err
    //         })
    //     }
    //
    //     if (!doc) {
    //         res.status(404).json({
    //             title: 'No user found',
    //             error: {message: 'User could not be found'}
    //         })
    //     }
    //
    //     if (doc) {
    //         console.log("doc size:", doc.length);
    //         res.status(200).json({
    //             message: 'Success',
    //             jobs: doc
    //         })
    //     }
    //
    // })


});

router.get('/home', function (req, res, next) {

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
                // console.log('finished')
            });

    }
});

router.get('/', function (req, res, next) {
    // console.log('inside / of appRoutes.js');
    // res.render('index');
	res.send('Hello World!');
	// next();
});


module.exports = router;