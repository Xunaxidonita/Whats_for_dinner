const router = require('express').Router();
const { User, Recipe, Category, Comment } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    Recipe.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'category_id',
            'user_id'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'recipe_id', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbRecipeData => {
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Recipe.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'description',
            'category_id',
            'user_id'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'recipe_id', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbRecipeData => {
        if (!dbRecipeData) {
            return res.status(404).json({ message: 'No Recipe found with this ID'});
        }
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Recipe.create({
        title: req.body.title,
        description: req.body.description,
        category_id: [req.body.category_id],
        user_id: req.body.user_id
    })
    .then(dbRecipeData => {
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Recipe.update({
        where: {
            id: req.params.id
        }
    },
        {
        title: req.body.title,
        description: req.body.description,
        category_id: [req.body.category_id]
    })
    .then(dbRecipeData => {
        if (!dbRecipeData) {
            return res.status(404).json({ message: 'No Recipe found with this ID'});
        }
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Recipe.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbRecipeData => {
        if (!dbRecipeData) {
            return res.status(404).json({ message: 'No Recipe found with this ID'});
        }
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;