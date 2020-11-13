//this file collects and exports the data from the different models

const User = require('./User');

//create relationships between models :
//EX: 

// User.hasMany(Post, {
//     foreignKey: 'user_id'
// });

module.exports = { User };