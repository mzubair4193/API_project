'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {




    static associate(models) {
      // define association here


      // ! In AuthMe Backend Walkthru video 17:20

        User.hasMany(models.Spot, { foreignKey: "ownerId" })
        User.hasMany(models.Booking, { foreignKey: "userId" })
        User.hasMany(models.Review, { foreignKey: "userId" })
      }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [3, 20]
        }
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [3, 20]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      // added 10/30/2023 // ! In AuthMe Backend Walkthru video
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};
