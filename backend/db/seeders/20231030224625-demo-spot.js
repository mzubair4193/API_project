'use strict';

const { Spot } = require('../models');

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
    await Spot.bulkCreate([
      {

        ownerId: 1,
        address: '123 Somewhere St',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA',
        lat: 23.456453,
        lng: 45.456433,
        name: 'The Phoenix House',
        description: 'somewhere',
        price: 1000

      },
      {
        ownerId: 2,
        address: '234 Georgia St',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'USA',
        lat: 34.65763,
        lng: 23.35521,
        name: 'The Atlanta House',
        description: 'somewhere',
        price: 790
      },
      {
        ownerId: 3,
        address: '456 Hollywood St',
        city: 'Hollywood',
        state: 'Florida',
        country: 'USA',
        lat: 38.23436,
        lng: 37.35622,
        name: 'The Hollywood House',
        description: 'somewhere',
        price: 1200
      },
      {

        ownerId: 3,
        address: '123 SomewhereElse St',
        city: 'New York',
        state: 'New York',
        country: 'USA',
        lat: 23.456453,
        lng: 45.456433,
        name: 'The Big Apple House',
        description: 'somewhere',
        price: 1000

      },
      {
        ownerId: 1,
        address: '234 Palm St',
        city: 'Palm Beach',
        state: 'Florida',
        country: 'USA',
        lat: 34.65763,
        lng: 23.35521,
        name: 'The Palm Beach House',
        description: 'somewhere',
        price: 790
      },
      {
        ownerId: 2,
        address: '456 California St',
        city: 'Hollywood',
        state: 'California',
        country: 'USA',
        lat: 38.23436,
        lng: 37.35622,
        name: 'The Real Hollywood House',
        description: 'somewhere',
        price: 1200
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      city: { [Op.in]: ['Phoenix', 'Atlanta', 'Hollywood', 'New York', 'Palm Beach'] }
    }, {});
  }
};
