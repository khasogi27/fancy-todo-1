'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = [
      {
        "title": "Lecture",
        "description": "Lecture Day 3",
        "status": "false",
        "due_date": "2020-10-29 07:00:00+07",
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ]
    return queryInterface.bulkInsert('Todos', data)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Todos', null)
  }
};
