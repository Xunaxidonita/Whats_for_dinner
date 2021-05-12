const router = require('express').Router();
const { Comment, Category, User, Recipe } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    User.findAll({
        exclude: ['password'],
        attributes: [
            'id',
            'username',
            'email'
        ]
    })
    .then(dbUserData => {
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        exclude: ['password'],
        attributes: [
            'id',
            'username',
            'email'
        ],
        include: [
            {
                model: Recipe,
                atttributes: [
                    'title'
                ]
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            return res.status(404).json({ message: 'No User found with this ID'});
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }   
    })
    .then(dbUserData => {
        if (!dbUserData) {
            return res.status(404).json({ message: 'No User found with this ID'});
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            return res.status(404).json({ message: "No User found with this ID"});
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;