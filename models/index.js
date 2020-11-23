//this file collects and exports the data from the different models
const User = require('./User');
const Category = require('./Category');
const Ingredient = require('./Ingredient');
const Drink = require('./Drinks');

//one to many relationship between category and ingredients
Category.hasMany(Ingredient, {
    foreignKey: 'category_id'
});

//ingredient has a category
Ingredient.belongsTo(Category, {
    foreignKey: 'category_id'
});

//drink has a user
Drink.belongsTo(User, {
    foreignKey: 'user_id'
});

//user has many drinks
User.hasMany(Drink, {
    foreignKey: 'user_id'
});

module.exports = { User, Category, Drink, Ingredient };