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

router.post('/', function (req, res) {
    console.log("you're in the post section with the following request");
    console.log(req.body);

    res.status(200).json({
        message: "you've made it to the post safely"
    })


});

module.exports = router;