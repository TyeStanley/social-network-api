const router = require('express').Router();
const userRoutes = require('./user');

// prefix /api/users
router.use('/users', userRoutes);

module.exports = router;