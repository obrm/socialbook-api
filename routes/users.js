const express = require('express')
const {
  updateUser,
  getUser,
  followUser,
  unfollowUser,
  deleteUser
} = require('../controllers/users');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/:id/follow').put(followUser)
router.route('/:id/unfollow').put(unfollowUser)
router.route('/:id').put(updateUser).delete(deleteUser).get(getUser)

module.exports = router