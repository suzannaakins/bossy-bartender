const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our CATEGORY model
class Drinks extends Model { }

Drinks.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        externalId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING
        },
        glass: {
            type: DataTypes.STRING
        },
        ingredients: {
            type: DataTypes.ARRAY
        },
        measurements: {
            type: DataTypes.ARRAY
        },
        instructions: {
            type: DataTypes.STRING
        }
        // Need to add userId
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'drinks'
    }
);

module.exports = Drinks;