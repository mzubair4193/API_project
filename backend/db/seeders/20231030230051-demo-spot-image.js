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
      },
      /***********************************************************************************************/
      {
        spotId: 7,
        url: 'http://tinyurl.com/uc495akx',
        preview: false
      },
      {
        spotId: 7,
        url: 'http://tinyurl.com/3c95p3dv',
        preview: false
      },
      {
        spotId: 7,
        url: 'http://tinyurl.com/4xcn8zkj',
        preview: false
      },
      {
        spotId: 7,
        url: 'http://tinyurl.com/4fzsnmm5',
        preview: false
      },
      {
        spotId: 7,
        url: 'http://tinyurl.com/55hwyyex',
        preview: false
      },
      {
        spotId: 8,
        url: 'http://tinyurl.com/yywfx29y',
        preview: false
      },
      {
        spotId: 8,
        url: 'http://tinyurl.com/4v8pb22c',
        preview: false
      },
      {
        spotId: 8,
        url: 'http://tinyurl.com/3vfz9dk9',
        preview: false
      },
      {
        spotId: 8,
        url: 'http://tinyurl.com/3wp37pmk',
        preview: false
      },
      {
        spotId: 8,
        url: 'http://tinyurl.com/32kuuzdm',
        preview: false
      },
      {
        spotId: 9,
        url: 'http://tinyurl.com/yk9svuf5',
        preview: false
      },
      {
        spotId: 9,
        url: 'http://tinyurl.com/mshbu7kt',
        preview: false
      },
      {
        spotId: 9,
        url: 'http://tinyurl.com/4h8vnzc4',
        preview: false
      },
      {
        spotId: 9,
        url: 'http://tinyurl.com/2p86vffj',
        preview: false
      },
      {
        spotId: 9,
        url: 'http://tinyurl.com/5ddh8eny',
        preview: false
      },
      {
        spotId: 10,
        url: 'http://tinyurl.com/ypfwz8zy',
        preview: false
      },
     {
        spotId: 10,
        url: 'http://tinyurl.com/27my6d7c',
        preview: false
      },
      {
        spotId: 10,
        url: 'http://tinyurl.com/5n99bm22',
        preview: false
      },
      {
        spotId: 10,
        url: 'http://tinyurl.com/22wz4dxm',
        preview: false
      },
      {
        spotId: 10,
        url: 'http://tinyurl.com/yrs7z2wk',
        preview: false
      },
      {
        spotId: 11,
        url: 'http://tinyurl.com/mrt8f73n',
        preview: false
      },
      {
        spotId: 11,
        url: 'http://tinyurl.com/5ep2ujwb',
        preview: false
      },
      {
        spotId: 11,
        url: 'http://tinyurl.com/br97wbbm',
        preview: false
      },
      {
        spotId: 11,
        url: 'http://tinyurl.com/yckh29hw',
        preview: false
      },
      {
        spotId: 11,
        url: 'http://tinyurl.com/bdzdn2ru',
        preview: false
      },
      {
        spotId: 12,
        url: 'http://tinyurl.com/bdfuckrm',
        preview: false
      },
      {
        spotId: 12,
        url: 'http://tinyurl.com/22bt4rts',
        preview: false
      },
      {
        spotId: 12,
        url: 'http://tinyurl.com/y4cpj8vp',
        preview: false
      },
      {
        spotId: 12,
        url: 'http://tinyurl.com/4xn93yxs',
        preview: false
      },
      {
        spotId: 12,
        url: 'http://tinyurl.com/32zmuak5',
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
