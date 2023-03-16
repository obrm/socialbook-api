const router = require('express').Router()
const {
  createPost,
  updatePost,
  deletePost,
  toggleLikePost,
  getPost,
  getTimelinePosts,
  getUserPosts
} = require('../controllers/posts');

const { protect } = require('../middleware/authMiddleware');

router.route('/:id').get(getPost)
router.route('/:id/timeline/all').get(protect, getTimelinePosts)
router.route('/user/:id').get(protect, getUserPosts)
router.route('/').post(protect, createPost)
router.route('/:id').put(protect, updatePost)
router.route('/:id/like').put(protect, toggleLikePost)
router.route('/:id').delete(protect, deletePost)

module.exports = router