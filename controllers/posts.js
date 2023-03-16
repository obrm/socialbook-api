const asyncHandler = require('express-async-handler')
const Post = require('../models/Post')
const User = require('../models/User')
const shuffleArray = require('../utils/shuffleArray')

// @desc      Create a post
// @route     POST /api/posts
// @access    Private
exports.createPost = asyncHandler(async (req, res) => {
  const newPost = new Post(req.body)

  const savedPost = await newPost.save()

  res.status(200).send(savedPost)
});

// @desc      Update a a post
// @route     PUT /api/posts/:id
// @access    Private
exports.updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.userId === req.body.userId) {
    await post.updateOne({ $set: req.body });
    res.status(200).json("the post has been updated");
  } else {
    res.status(403).json("you can update only your post");
  }
});

// @desc      Like Dislike a post
// @route     PUT /api/posts/:id/like
// @access    Private
exports.toggleLikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.body.userId)) {
    await post.updateOne({ $push: { likes: req.body.userId } });
    res.status(200).json("The post has been liked");
  } else {
    await post.updateOne({ $pull: { likes: req.body.userId } });
    res.status(200).json("The post has been disliked");
  }
});

// @desc      Delete a post
// @route     DELETE /api/posts/:id
// @access    Private
exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.userId === req.body.userId) {
    await post.deleteOne();
    res.status(200).json("the post has been deleted");
  } else {
    res.status(403).json("you can delete only your post");
  }
});

// @desc      Get a a post
// @route     GET /api/posts/:id
// @access    Public
exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.status(200).json(post);
});

// @desc      Get timeline posts
// @route     GET /api/posts/:id/timeline/all
// @access    Private
exports.getTimelinePosts = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.params.id);
  const friendPosts = await Promise.all(
    currentUser.following.map((friendId) => {
      return Post.find({ userId: friendId });
    })
  );
  res.json(shuffleArray(friendPosts))
});

// @desc      Get user posts
// @route     GET /api/posts/user/:id
// @access    Private
exports.getUserPosts = asyncHandler(async (req, res) => {
  const userPosts = await Post.find({ userId: req.params.id });
  res.json(userPosts)
});