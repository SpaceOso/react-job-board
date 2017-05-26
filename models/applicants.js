var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var applicants = new Schema({
        userID: String,
        firstName: String,
        lastName: String,
        cellPhone: String,
        homePhone: String,
        email: String,
        resume: String,
        coverLetter: String,
        location: {
            address: {type: String},
            city: {type: String},
            state: {type: String},
            zipCode: {type: Number}
        },
        employerID: {type: Schema.Types.ObjectId, ref: 'Employer'},
        jobID: {type: Schema.Types.ObjectId, ref: 'Jobs'},
    },
    {timestamps: true});


module.exports = mongoose.model('Applicants', applicants);