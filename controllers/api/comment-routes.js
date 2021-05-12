const router = require('express').Router();
const { Comment, User, Recipe, Category } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'recipe_id'
        ],
        include: [
            {
                model: Recipe,
                attributes: ['id', 'title', 'description', 'user_id'],
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
    .then(dbCommentData => {
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'recipe_id'
        ],
        include: [
            {
                model: Recipe,
                attributes: ['id', 'title', 'description', 'user_id'],
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
    .then(dbCommentData => {
        if (!dbCommentData) {
            return res.status(404).json({ message: 'No Comment found with this ID'});
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            return res.status(404).json({ message: 'No Comment found with this ID'});
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if (!dbCommentData) {
            return res.status(404).json({ message: 'No comment found with this ID'});
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;