'use strict';

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://shorturl.at/sADEN',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://shorturl.at/fLNR9',
        preview: false
      },
      {
        spotId: 2,
        url: 'spotimg2.com',
        preview: false
      },
      {
        spotId: 3,
        url: 'spotimg3.com',
        preview: false
      },
      {
        spotId: 4,
        url: 'spotimg4.com',
        preview: false
      },
      {
        spotId: 5,
        url: 'spotimg5.com',
        preview: false
      },
      {
        spotId: 6,
        url: 'spotimg6.com',
        preview: false
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://shorturl.at/sADEN', 'spotimg2.com', 'spotimg3.com'] }
    }, {});
  }
};
