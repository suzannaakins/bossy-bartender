const seedUsers = require('./user-seeds');
const seedCategories = require('./category-seeds');
const seedIngredients = require('./ingredient-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  
  // Seed Users
  await seedUsers();
  console.log('--------------');

  // Seed Ingredients
  await seedIngredients();
  console.log('--------------');

  // Seed Categories
  await seedCategories();
  console.log('--------------');

  process.exit(0);
};

seedAll();
