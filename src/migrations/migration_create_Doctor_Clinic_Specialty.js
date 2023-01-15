'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Doctor_Clinic_Specialty', {
            //     statusID: DataTypes.STRING,
            // doctorID: DataTypes.INTEGER,
            // patientID: DataTypes.INTEGER,
            // date: DataTypes.DATE,
            // timeType: DataTypes.STRING,
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            doctorID: {
                type: Sequelize.INTEGER
            },

            clinicID: {
                type: Sequelize.INTEGER
            },
            specialtyID: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Doctor_Clinic_Specialty');
    }
};