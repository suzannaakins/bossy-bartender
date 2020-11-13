//this file collects all of the API routes and packages them up

const router = require('express').Router();

const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);
// router.use('/drinks', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);



module.exports = router;