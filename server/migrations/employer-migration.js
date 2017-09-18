'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        'use strict';
        return queryInterface.createTable('Employer', {
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },
            location: {
                type: Sequelize.JSONB,
                allowNull: false
            },
            logoImg: {
                type: Sequelize.STRING,
            },
            website: {
                type: Sequelize.STRING,
            },
            twitter: {
                type: Sequelize.STRING,
            },
            facebook: {
                type: Sequelize.STRING,
            },
            linkedIn: {
                type: Sequelize.STRING,
            }
        });
    },
    down: (queryInterface, /*Sequelize*/) => {
        return queryInterface.dropTable('Employer');
    }
};