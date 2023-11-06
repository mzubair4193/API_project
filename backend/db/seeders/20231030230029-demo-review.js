'use strict';
const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Review.bulkCreate([
      {
        spotId: 3,
        userId: 1,
        review: "This location is family friendly",
        stars: 1,

      },
      {
        spotId: 1,
        userId: 2,
        review: "This location was pretty interesting",
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: "This location was suitable for couples",
        stars: 3
      },
      {
        spotId: 3,
        userId: 2,
        review: "This location was not enjoyable",
        stars: 2,

      },
      {
        spotId: 1,
        userId: 3,
        review: "This location was a blast",
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: "This location was just meh",
        stars: 2
      }
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      stars: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
