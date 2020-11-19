const sequelize = require('../config/connection');
const { Category } = require('../models');

const catdata = [
  {
    title: 'Spirits',
    id: 1
  },
  {
    title: 'Wines/Beer',
    id: 2
  },
  {
    title: 'Liqueurs',
    id: 3
  },
  {
    title: 'Syrups',
    id: 4
  },
  {
    title: 'Food/Fruits',
    id: 5
  },
  {
    title: 'Juices/Sodas', 
    id: 6
  },
  {
    title: 'Other',
    id: 7
  }
];

const seedCategories = () => Category.bulkCreate(catdata, {individualHooks: true});

module.exports = seedCategories;