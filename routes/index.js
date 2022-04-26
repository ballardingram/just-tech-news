const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/users', apiRoutes);

module.exports = router;