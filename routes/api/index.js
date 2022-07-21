const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes')

// prefix /api/users
router.use('/users', userRoutes);

// prefix /api/thoughts
router.use('/thoughts', thoughtRoutes);

module.exports = router;