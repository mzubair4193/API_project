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
        address: '1 Private Castle Rd',
        city: 'Philipstown',
        state: 'New York',
        country: 'USA',
        lat: 41.424839,
        lng: -73.945831,
        name: 'Private Garrison Mansion',
        description: "Welcome to our charming Castle! You'll have access to the pond, Appalachian Trail, enjoy the fireplace or firepit outside, walks in the woods and we can offer plenty of local recommendations.",
        price: 1187

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
        description: `Surrounded by tall trees and hidden behind an iron gate, this fairytale-esque mansion will make your holiday gathering extra special this year! Featuring 30,000 sq ft of indoor space and 10 spacious bedrooms with en suite bathrooms, this mansion is perfect for big groups & intimate gatherings.`,
        price: 4245
      },
      {
        ownerId: 3,
        address: '456 Hollywood St',
        city: 'Miami Beach',
        state: 'Florida',
        country: 'USA',
        lat: 38.23436,
        lng: 37.35622,
        name: 'The Miami House',
        description: `Spectacular waterfront villa on Palm Island! This Spanish Colonial style villa features views across Biscayne Bay, a private dock, dining terrace with barbecue, a walk-in pool with Jacuzzi and waterfall. `,
        price: 9999
      },
      {

        ownerId: 3,
        address: '123 SomewhereElse St',
        city: 'Houston',
        state: 'Texas',
        country: 'USA',
        lat: 23.456453,
        lng: 45.456433,
        name: 'Hidden Spanish Palace',
        description: `Hidden Spanish palace Is a once in a lifetime gem of an experience! Perfect for weddings, large events, or an unforgettable get away This is a unique Spanish style castle fit for a conquistador. `,
        price: 7000

      },
      {
        ownerId: 1,
        address: '234 Palm St',
        city: 'Spruce Pine',
        state: 'North Carolina',
        country: 'USA',
        lat: 34.65763,
        lng: 23.35521,
        name: 'Fairy Tale Castle',
        description: `Smithmore Castle is unlike anywhere in the world. This real life Castle offers exclusive stays curated specifically for your booking. `,
        price: 2228
      },
      {
        ownerId: 2,
        address: '456 California St',
        city: 'Skyforest',
        state: 'California',
        country: 'USA',
        lat: 38.23436,
        lng: 37.35622,
        name: 'The Castle in the Forest',
        description: "Nestled in a deep canyon nearby serene Lake Arrowhead – you will find Southern Californias secret gem: the Castle In the Forest.",
        price: 3450
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
      city: { [Op.in]: ['Philipstown', 'Atlanta', 'Miami Beach', 'Houston', 'Spruce Pine', 'Skyforest']}
    }, {});
  }
};
