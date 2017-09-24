const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
		title: {type: String, required: true},
		description: {type: String, required: true},
        applicants: [{type: Schema.Types.ObjectId, ref: 'Applicants'}],
        employerName: {type: String, required: true},
        employerId: {type: Schema.Types.ObjectId, ref: 'Employer'},
        employerLogo: {type: String},
        date: { type: Date, default: Date.now },
    },
    {timestamps: true}
);

module.exports = mongoose.model('Jobs', schema);