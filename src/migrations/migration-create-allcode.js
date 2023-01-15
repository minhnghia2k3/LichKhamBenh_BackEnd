'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('allcodes', {
            // key: DataTypes.STRING,
            // type: DataTypes.STRING,
            // valueEN: DataTypes.STRING,
            // valueVI: DataTypes.STRING
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            key: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            valueEN: {
                type: Sequelize.STRING
            },
            valueVI: {
                type: Sequelize.STRING
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('allcodes');
    }
};