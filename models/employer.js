const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

let schema = new Schema({
	name: String,
	location: {
		address: {type: String, required: true},
		city: {type: String, required: true},
		state: {type: String, required: true},
		zip: {type: Number, required: true}
	},
	logoImg: String,
	socialMedia: {
		website: {type: String},
		twitter: {type: String},
		facebook: {type: String},
		linkedin: {type: String}
	},
	/*What we're saying below is: in the jobs property store references to the jobs we posted.
	 * We don't post each job in here just an id to them. We might change this later to actually store the job.
	 * But I think this would work best, because we display a list of jobs in the main page, it'd be nice if we didn't
	 * have to look up into every employer collection to pull jobs out.*/
	jobs: [{type: Schema.Types.ObjectId, ref: 'Jobs'}],
	applicants: [{type: Schema.Types.ObjectId, ref: 'Applicants'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Employer', schema);