const sequelize = require('../config/connection');
const { Category } = require('../models');

const catdata = [
  {
    title: 'Spirits',
  },
  {
    title: 'Wines/Beer',
  },
  {
    title: 'Liqueurs',
  },
  {
    title: 'Syrups',
  },
  {
    title: 'Food/Fruits',
  },
  {
    title: 'Juices/Sodas',
  },
  {
    title: 'Other',
  }
];

const seedCategories = () => Category.bulkCreate(catdata, { individualHooks: true });

module.exports = seedCategories;