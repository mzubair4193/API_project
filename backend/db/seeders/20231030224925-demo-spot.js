'use strict';

const { Spot } = require('../models');

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
    await Spot.bulkCreate([
       {
        ownerId: 1,
        address: '123 Somewhere St',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA',
        lat: 45.12,
        lng: 33.44,
        name: 'The Phoenix House',
        description: 'somewhere',
        price: 990000
      },
      {
        ownerId: 2,
        address: '234 Somewhere St',
        city: 'Atlanta',
        state: 'Georgia',
        country: 'USA',
        lat: 60.22,
        lng: 22.44,
        name: 'The Atlanta House',
        description: 'somewhere',
        price: 790000
      },
      {
        ownerId: 3,
        address: '456 Somewhere St',
        city: 'Hollywood',
        state: 'Florida',
        country: 'USA',
        lat: 25.82,
        lng: 63.24,
        name: 'The Hollywood House',
        description: 'somewhere',
        price: 1200000
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};

// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('Spots', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       address: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       city: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       state: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       country: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       lat: {
//         type: Sequelize.DECIMAL
//       },
//       lng: {
//         type: Sequelize.DECIMAL
//       },
//       name: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       description: {
//         type: Sequelize.STRING,
//         allowNull: false
//       },
//       price: {
//         type: Sequelize.DECIMAL,
//         allowNull: false
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
//       }
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('Spots');
//   }
// };
