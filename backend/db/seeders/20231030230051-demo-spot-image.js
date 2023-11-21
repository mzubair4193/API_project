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
        spotId: 1,
        url: 'https://shorturl.at/fsHP8',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://shorturl.at/hoDX1',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://shorturl.at/eJOU0',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://shorturl.at/oXY07',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://shorturl.at/EJQ24',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://tinyurl.com/2yj789pj',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://tinyurl.com/msnu62c9',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://tinyurl.com/uzrkdhte',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://tinyurl.com/m8nkhpcp',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://tinyurl.com/bdff3st6',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://tinyurl.com/k69c67z6',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://tinyurl.com/zam9ss2d',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://tinyurl.com/5uum2apr',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://tinyurl.com/37k7f73k',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://tinyurl.com/2va9ccce',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://tinyurl.com/y67hvcux',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://tinyurl.com/bdy2eekj',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://tinyurl.com/246pcpd5',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://tinyurl.com/4vs8vr5y',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://tinyurl.com/5699drj',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://tinyurl.com/2m2dnjd4',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://tinyurl.com/5223dfet',
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
