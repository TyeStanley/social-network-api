const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// Set the GET, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

  // Set up POST at /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction);

// Set up DELETE at /api/thoughts/:thoughtId/:reactions/
router
  .route('/:thoughtId/:reactions')
  .delete(deleteReaction);

module.exports = router;