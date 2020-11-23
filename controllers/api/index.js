//this file collects all of the API routes and packages them up

const router = require('express').Router();

const userRoutes = require('./user-routes.js');
// const commentRoutes = require('./comment-routes.js');
const ingredientRoutes = require('./ingredient-routes.js');
const categoryRoutes = require('./category-routes.js');
const drinkRoutes = require('./drink-routes.js');
const twillioRoutes = require('./twilio-routes.js');

router.use('/users', userRoutes);
// router.use('/comments', commentRoutes);
router.use('/ingredient', ingredientRoutes);
router.use('/category', categoryRoutes);
router.use('/drink', drinkRoutes);
router.use('/twilio', twillioRoutes);


module.exports = router;