/**
 * Created by Rico on 9/20/16.
 */

/*These are the routes from express*/
let express = require('express');
let router = express.Router();


router.get('/',function (req, res, next) {
    console.log("you're in the job seeker page");
    res.render('You are in the jobseeker page');
    res.render('You are in the jobseeker page');
});

module.exports = router;