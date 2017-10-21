'use strict';
module.exports = (sequelize, DataTypes) => {
	const Applicants = sequelize.define('Applicants',
		{
			id: {
				allowNull: false,
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: sequelize.literal('uuid_generate_v1()'),
			},
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			homePhone: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			cellPhone: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			website:{
				type: DataTypes.STRING
			},
			linkedin:{
				type: DataTypes.STRING
			},
			github:{
				type: DataTypes.STRING
			},
			state: {
				type: DataTypes.STRING,
			},
			city: {
				type: DataTypes.STRING,
			},
			zip:{
				type: DataTypes.STRING,
			},
			coverLetter: {
				type: DataTypes.STRING
			},
			resume: {
				type: DataTypes.STRING
			},
			status: {
				type: DataTypes.STRING,
				defaultValue: 'Needs Review'
			},
			interest: {
				type: DataTypes.STRING,
				defaultValue: 'Needs Review',
			}
		},
		{
			// disable the modification of tablenames; By default, sequelize will automatically
			// transform all passed model names (first parameter of define) into plural.
			// if you don't want that, set the following
			freezeTableName: true,
		});

	Applicants.associate = (models) => {
		Applicants.hasMany(models.Notes, {foreignKey: "applicantId"});
		// Applicants.belongsTo(models.Job, {foreignKey: 'applicantId'});
	};
	return Applicants;
};