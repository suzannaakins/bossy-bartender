//this file collects all of the API routes and packages them up

const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const commentRoutes = require('./comment-routes.js');
const ingredientRoutes = require('./ingredient-routes.js');
const categoryRoutes = require('./category-routes.js');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/ingredient', ingredientRoutes);
router.use('/category', categoryRoutes);


module.exports = router;