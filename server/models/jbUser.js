module.exports = (sequelize, DataTypes) => {
    "use strict";
    const JbUser = sequelize.define("JbUser", {
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
            location: {
                type: DataTypes.JSONB
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true,
        });

    JbUser.associate = (models) => {
        JbUser.hasOne(models.Employer, {
            foreignKey: 'employerId',
            as: 'employer',
        });
    };

    return JbUser;
};
