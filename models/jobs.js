const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
        jobTitle: {type: String, required: true},
        jobDescription: {type: String, required: true},
        applicants: [{type: Schema.Types.ObjectId, ref: 'Applicants'}],
        employerName: {type: String, required: true},
        employerId: {type: Schema.Types.ObjectId, ref: 'Employer'},
        employerLogo: {type: String}
    },
    {timestamps: true}
);

module.exports = mongoose.model('Jobs', schema);