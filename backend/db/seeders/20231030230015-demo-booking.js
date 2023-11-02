'use strict';

const { Booking } = require('../models')

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
   await Booking.bulkCreate([

    {
      spotId: 3,
      userId: 1,
      startDate: '05/02/20',
      endDate: '06/05/20'
    },
    {
      spotId: 1,
      userId: 2,
      startDate: '09/05/19',
      endDate: '09/10/19'
    },
    {
      spotId: 2,
      userId: 3,
      startDate: '11/01/23',
      endDate: '12/09/23'
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['12/05/23', '11/03/23', '11/27/23'] }
    }, {});
  }
};
