'use strict';

const { ReviewImage } = require('../models')

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
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'sampleImg1.com'
      },
      {
        reviewId: 2,
        url: 'sampleImg2.com'
      },
      {
        reviewId: 3,
        url: 'sampleImg3.com'
      },
      {
        reviewId: 4,
        url: 'sampleImg4.com'
      },
      {
        reviewId: 5,
        url: 'sampleImg5.com'
      },
      {
        reviewId: 6,
        url: 'sampleImg6.com'
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
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['sampleImg1.com', 'sampleImg2.com', 'sampleImg3.com', 'sampleImg4.com', 'sampleImg5.com', 'sampleImg6.com'] }
   }, {});
  }
}
