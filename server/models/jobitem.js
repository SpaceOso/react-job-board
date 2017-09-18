module.exports = (sequelize, DataTypes) => {
    const JobItem = sequelize.define('JobItem', {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });
    JobItem.associate = (models) => {
        JobItem.belongsTo(models.Job, {
            foreignKey: 'jobId',
            onDelete: 'CASCADE',
        });
    };
    return JobItem;
};
