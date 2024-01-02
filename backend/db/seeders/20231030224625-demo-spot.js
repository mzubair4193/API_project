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

        ownerId: 4,
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
        ownerId: 5,
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
        ownerId: 6,
        address: '456 California St',
        city: 'Skyforest',
        state: 'California',
        country: 'USA',
        lat: 38.23436,
        lng: 37.35622,
        name: 'The Castle in the Forest',
        description: "Nestled in a deep canyon nearby serene Lake Arrowhead you will find Southern Californias secret gem: the Castle In the Forest.",
        price: 3450
      },
      {

        ownerId: 1,
        address: '123 Waterfront Rd',
        city: 'Wilton Manors',
        state: 'Florida',
        country: 'USA',
        lat: 71.424839,
        lng: 73.945831,
        name: 'Exquisite Modern Luxury Personal Resort',
        description: "Ultra modern yet warm private resort home on 130' of ocean access water.  Breathtaking views from every room from sunrise to sunset and from the heated, salt water infinity pool with built in spa.",
        price: 2495

      },
      {
        ownerId: 2,
        address: '234 Long Bay Hills Rd',
        city: 'Long Bay',
        state: 'Caicos Islands',
        country: 'British Overseas Territory',
        lat: 34.65763,
        lng: 21.35521,
        name: 'The Umi Villa',
        description: "Set on one of Conde Nast Traveller’s, Umi loves to show off its incredible location on southern Turks and Caicos’ Long Bay Beach. Start each morning with a stroll along the sandy shore, feeling the soothing turquoise waters of the Caribbean on your feet.",
        price: 10000
      },
      {
        ownerId: 3,
        address: '1 Waterfront Oasis Pkwy',
        city: 'Turks',
        state: 'Caicos Islands',
        country: 'British Overseas Territory',
        lat: 38.23436,
        lng: 27.35622,
        name: 'Stunning 6 Bedroom Waterfront Oasis',
        description: `Located on Chalk Sound’s brilliant turquoise waters, Villa Ombre offers an intimate waterfront experience on the award winning Turks and Caicos Islands. This beautiful villa offers a blend of indoor and outdoor living with breathtaking views.`,
        price: 4600
      },
      {

        ownerId: 4,
        address: '123 Fire Island Pvt Dr',
        city: 'Ibiza',
        state: 'Catalan',
        country: 'Spain',
        lat: 33.456453,
        lng: 45.456433,
        name: 'Private Island in Ibiza',
        description: `In the heart of the private island of Tagomago lies the luxury villa that only and exclusive residence on this stunningly beautiful private island.`,
        price: 34685

      },
      {
        ownerId: 5,
        address: '234 Casteel Creek',
        city: 'Edwards',
        state: 'Colorado',
        country: 'USA',
        lat: 84.65763,
        lng: 63.35521,
        name: 'The Chateau at Casteel Creek',
        description: `Surrounded by hundreds of open acres, bordering pristine National Forest land, this premium estate with over 30,000 sq. ft. of living space provides the ultimate ambiance and seclusion for a Rocky Mountain retreat. `,
        price: 18626
      },
      {
        ownerId: 6,
        address: '456 Mill Creek Rd',
        city: 'Vail',
        state: 'Colorado',
        country: 'USA',
        lat: 30.23436,
        lng: 37.35622,
        name: 'The Rockledge Ski Resort',
        description: "Welcome to your dream home one of Vail's crown jewels. With 8-bedrooms and 10,000 sq ft, this ski-in, ski-out stunner is just steps from the Bear Tree ski run and a perfect private escape for multiple families, weddings, special events, and much more!",
        price: 16573
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
      city: { [Op.in]: ['Philipstown', 'Atlanta', 'Miami Beach', 'Houston', 'Spruce Pine', 'Skyforest', 'Wilton Manors', 'Long Bay', 'Turks', 'Ibiza', 'Edwards', 'Vail',]}
    }, {});
  }
};
