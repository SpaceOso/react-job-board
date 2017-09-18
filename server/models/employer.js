"use strict";
module.exports = (sequelize, DataTypes) => {
    const Employer = sequelize.define("Employer", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location:{
          type: DataTypes.JSONB,
            allowNull: false,
        },
        logoImg: {
            type: DataTypes.STRING,
        },
        website: {
            type: DataTypes.STRING,
        },
        twitter: {
            type: DataTypes.STRING,
        },
        facebook: {
            type: DataTypes.STRING,
        },
        linkedIn: {
            type: DataTypes.STRING,
        },
    });

    Employer.associate = (models) => {
        Employer.belongsTo(models.JbUser, {
            foreignKey: 'employerId',
            as: 'employer'
        });
    };

    return Employer;
};