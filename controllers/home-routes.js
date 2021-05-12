const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Category, Comment, Recipe } = require('../models');

router.get('/', (req, res) => {
    Recipe.findAll({
        attributes: ['id', 'title', 'description', 'category_id', 'user_id', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'user_id',
                    'recipe_id'
                ],
                include: [{
                    model: User,
                    attributes: ['username']
                }]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbRecipeData => {
        const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));
        res.render('homepage', { recipes })
    })
});

module.exports = router;