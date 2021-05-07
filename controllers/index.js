const router = require('express').Router();

const apiRoutes = require('./api');

module.exports = require('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;