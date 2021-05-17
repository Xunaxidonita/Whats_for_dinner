const router = require('express').Router();
const { Comment, Category, User, Recipe } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET all Users
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

// GET one User
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

// Create new User
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        req.session.save(() => {
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            return res.status(404).json({ message: 'No User found with this email address.'});
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Your password was entered incorrectly.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id,
            req.session.username = dbUserData.username,
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Logout
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });      
    } else {
        res.status(404).end();
    };
});

// Edit one User
router.put('/:id', withAuth, (req, res) => {
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

// Delete one user
router.delete('/:id', withAuth, (req, res) => {
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