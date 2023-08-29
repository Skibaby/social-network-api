const router = reuqire('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

router.route('/')
.get(getThoughts)
.post(createThought);

router.route('/:id')
.get(getSingleThoughts)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/Reactions')
.post(addReaction);

router.route(':/thoughtId/reactions/:reactionId')
.put(deleteReaction);

module.exports = router;