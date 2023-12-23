'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await User.bulkCreate([
      {
        email: 'demo@user.io',
        firstName: "Muhammad",
        lastName: "Zubair",
        username: 'OGFake',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        firstName: "Kanye",
        lastName: "West",
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        firstName: "Elvis",
        lastName: "Pressley",
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'user3@user.io',
        firstName: "Elton",
        lastName: "John",
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        email: 'user4@user.io',
        firstName: "Lady",
        lastName: "GaGa",
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        email: 'user5@user.io',
        firstName: "Michael",
        lastName: "Scarn",
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password6')
      }
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {

    options.tableName = 'Users';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['OGFake', 'FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4', 'FakeUser5'] }
    }, {});
  }
};
