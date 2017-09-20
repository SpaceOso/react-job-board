module.exports = (sequelize, DataTypes) => {

    const Job = sequelize.define('Job', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Job.associate = (models) => {
    };
    return Job;
};
