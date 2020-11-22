const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Drink model
class Drink extends Model { }

Drink.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        externalId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING
        },
        glass: {
            type: DataTypes.STRING
        },
        ingredients: {
            type: DataTypes.STRING
        },
        measurements: {
            type: DataTypes.STRING
        },
        instructions: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'drinks'
    }
);

module.exports = Drink;