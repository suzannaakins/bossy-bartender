const seedUsers = require('./user-seeds');
const seedCategories = require('./category-seeds');
const seedIngredients = require('./ingredient-seeds');
// const seedPosts = require('./post-seeds');
// const seedComments = require('./comment-seeds');
// const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');

  await seedIngredients();
  console.log('--------------');

  await seedCategories();
  console.log('--------------');

  await seedUsers();
  console.log('--------------');

  // // Seed Drinks
  // await seedDrinks();
  // console.log('--------------');

  process.exit(0);
};

seedAll();
