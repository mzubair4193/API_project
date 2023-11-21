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
        description: `Surrounded by tall trees and hidden behind an iron gate, this fairytale-esque mansion will make your holiday gathering extra special this year! Featuring 30,000 sq ft of indoor space and 10 spacious bedrooms with en suite bathrooms, this mansion is perfect for big groups & intimate gatherings. Amenities include a heated salt water pool + hot tub, a Chef’s Kitchen, a theater room, a Casablanca style bar + more!`,
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
        description: `Spectacular waterfront villa on Palm Island! This Spanish Colonial style villa features views across Biscayne Bay, a private dock, dining terrace with barbecue, a walk-in pool with Jacuzzi and waterfall. Villazzo is a hotel operator that transforms private luxury villas into 5-star hotels. Our signature 5-Star VillaHotel Experience includes a lifestyle organized by your own private Hotel Manager and his expert team of hand-picked and uniformed staff whom we train in-house to pamper you.`,
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
        description: `Hidden Spanish palace Is a once in a lifetime gem of an experience! Perfect for weddings, large events, or an unforgettable get away This is a unique Spanish style castle fit for a conquistador. With three extravagant rooms facing nature, Lavish pool Creek hike on the premise, come get lost for a weekend getaway!`,
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
        description: `Smithmore Castle is unlike anywhere in the world. This real life Castle offers exclusive stays curated specifically for your booking. Upon arrival, you will immediately be taken by the magical views of this "Castle in the Sky." Once you've checked in & relaxed in one of our outstanding rooms, a 3 course Gourmet dinner by renowned Chef Benjamin will be served at 6pm in the Royal Dining room. That's not all, your stay will also include a Royal Breakfast served at 8am at our majestic balcony.`,
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
        description: "Nestled in a deep canyon nearby serene Lake Arrowhead – you will find Southern Californias secret gem: the Castle In the Forest. Surrounded by towering pine and dogwood trees, this secluded 10,000 square foot chateau provides an unforgettable intimate setting for your stay. It is only 5 minutes away from restaurants in the Lake Arrowhead Village shopping center.",
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
