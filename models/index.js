//this file collects and exports the data from the different models

const User = require('./User');
//const Post = require('./Post');
const Comment = require('./Comment');
const Category = require('./Category');
const Ingredient = require('./Ingredient');

//one to many relationship between category and ingredients
Category.hasMany(Ingredient, {
    foreignKey: 'category_id'
});

Ingredient.belongsTo(Category, {
    foreignKey: 'category_id'
});

// //create ONE TO MANY relationship between user and posts :
// User.hasMany(Post, {
//     foreignKey: 'user_id'
// });

// Post.belongsTo(User, {
//     foreignKey: 'user_id',
// });

// association between comments and its post, and comments and its user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comment.belongsTo(Post, {
//     foreignKey: 'post_id'
// });

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// Post.hasMany(Comment, {
//     foreignKey: 'post_id'
// });

module.exports = { User, Comment };