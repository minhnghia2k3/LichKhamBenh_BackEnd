'use strict';

module.exports = {


  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'Le Minh',
      lastName: 'Nghia',
      address: 'VN',
      phoneNumber: "0886272070",
      gender: 1,
      image: "",
      roleID: "None",
      positionID: "",

      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
