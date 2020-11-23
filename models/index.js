//this file collects and exports the data from the different models

const User = require('./User');
// const Comment = require('./Comment');
const Category = require('./Category');
const Ingredient = require('./Ingredient');
const Drink = require('./Drinks');

//one to many relationship between category and ingredients
Category.hasMany(Ingredient, {
    foreignKey: 'category_id'
});

Ingredient.belongsTo(Category, {
    foreignKey: 'category_id'
});

// Comment.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// User.hasMany(Comment, {
//     foreignKey: 'user_id'
// });

Drink.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Drink, {
    foreignKey: 'user_id'
});

module.exports = { User, Category, Drink, Ingredient };