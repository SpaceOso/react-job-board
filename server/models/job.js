module.exports = (sequelize, DataTypes) => {

    const Job = sequelize.define('Job', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Job.associate = (models) => {
        Job.hasMany(models.JobItem, {
            foreignKey: 'jobId'
        });
    };
    return Job;
};
