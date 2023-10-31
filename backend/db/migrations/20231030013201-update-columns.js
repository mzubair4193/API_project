'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('ReviewImages', 'reviewId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Reviews"
      }
    })
    await queryInterface.addColumn('SpotImages', 'spotId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Spots'
      }
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
