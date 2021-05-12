const router = require('express').Router();

const recipeRoutes = require('./recipe-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const categoryRoutes = require('./category-routes');

router.use('/recipes', recipeRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;