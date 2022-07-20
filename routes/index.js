const router = require('express').Router();
const apiRoutes = require('./api');

// Add /api for our routes
router.use('/api', apiRoutes);

// If no API routes are hit, default to this route
router.use((req, res) => {
  res.status(404).send('<h1>404: Page not found!</h1>');
});

// Export the router for use by server.js
module.exports = router;