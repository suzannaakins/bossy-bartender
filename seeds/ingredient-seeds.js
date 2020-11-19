const sequelize = require('../config/connection');
const { Ingredient } = require('../models');

const ingdata = [
  {
    name: 'Vodka',
    category_id: '1'
  },
  {
    name: 'Gin',
    category_id: '1'
  },
  {
    name: 'Red Wine',
    category_id: '2'
  },
  {
    name: 'Triple Sec',
    category_id: '3'
  },
  {
    name: 'Simple Syrup',
    category_id: '4'
  },
  {
    name: 'Cherry',
    category_id: '5'
  },
  {
    name: 'Lime Juice',
    category_id: '6'
  },
  {
    name: 'Sugar',
    category_id: '7'
  }
];

const seedIngredients = () => Ingredient.bulkCreate(ingdata, {individualHooks: true});

module.exports = seedIngredients;