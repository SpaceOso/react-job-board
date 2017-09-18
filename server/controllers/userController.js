const JbUser = require('../models').JbUser;
module.exports = {
    create(req, res){
        "use strict";
        console.log("user created");
        // console.log("user information:", req.body);
        return JbUser
            .create({
                // id: null,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                location: req.body.location,
                password: req.body.password
            })
            .then((job) => res.status(201).send(job))
            .catch((error) => {
                res.status(400).send(error);
                console.log("error::", error);
            })
    },

    addEmployer(req, res){
        "use strict";

    },
    list(req, res){
        "use strict";
        console.log("job listed");
    }
};