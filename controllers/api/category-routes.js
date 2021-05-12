const router = require('express').Router();
const { Category, Comment, Recipe, User } = require('../../models');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    Category.findAll({
        attributes: [
            'id',
            'category_name'
        ]
    })
    .then(dbCategoryData => {
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            return res.status(404).json({ message: 'No Category found with this ID'});
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Category.create({
        category_name: req.body.category_name
    })
    .then(dbCategoryData => {
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
    Category.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            return res.status(404).json({ message: 'No Category found with this ID'});
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Category.delete({
        where: {
            id: req.params.id
        }
    })
    .then(dbCategoryData => {
        if (!dbCategoryData) {
            return res.status(404).json({ message: 'No Category found with this ID'});
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;