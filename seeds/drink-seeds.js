const sequelize = require('../config/connection');
const { Drink } = require('../models');

const drinkdata = [
  {
    name: 'Margarita',
    externalId: '11007',
    image: '',
    glass: 'Cocktail glass',
    ingredients: 'Tequila,Triple Sec,Lime Juice,Salt',
    measurments: '1/2 cup,1/2 tbs, 1/2 tsp',
    instructions: 'Make it',
    user_id: 1

  }
];

const seedDrinks = () => seedDrinks.bulkCreate(drink, {individualHooks: true});

module.exports = seedDrinks;