var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	cellPhone: {type: String, required: true},
	homePhone: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	userName: {type: String, required: true, unique: true},
	password: {type: String, required: true},
    location: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        zipCode: {type: Number, required: true}
    },
	uploads: [{type: Array}],
	jobsApplied: [{type: Schema.Types.ObjectId, ref: 'Jobs'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);