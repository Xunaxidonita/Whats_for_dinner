const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');

// GET all Posts in db, and include User model
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'post_url',
            'user_id',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id'],
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
    }).then(dbPostData => {
        console.log(dbPostData);
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: 
            }
        ]
    })
})

module.exports = router;