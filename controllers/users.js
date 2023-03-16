const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const sendResponse = require('../utils/sendResponse')

// @desc      Update user
// @route     PUT /api/users/:id
// @access    Private
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  sendResponse(user, res)
});

// @desc      Follow a user
// @route     PUT /api/users/:id/follow
// @access    Private
exports.followUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const userToFollow = await User.findById(req.body.userId);

  if (!user.following.includes(req.body.userId)) {
    await user.updateOne({ $push: { followings: req.params.id } });
    await userToFollow.updateOne({ $push: { followers: req.body.userId } });
  } else {
    res.status(400).json('you already follow this user');
  }
});

// @desc      unfollow a user
// @route     PUT /api/users/:id/unfollow
// @access    Private
exports.unfollowUser = asyncHandler(async (req, res) => {
  if (req.body.userId !== req.params.id) {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (user.followers.includes(req.body.userId)) {
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await currentUser.updateOne({ $pull: { followings: req.params.id } });
      res.status(200).json("user has been unfollowed");
    } else {
      res.status(403).json("you don't follow this user");
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

// @desc      Get single user
// @route     GET /api/users/:id
// @access    Private
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  sendResponse(user, res)
});

// @desc      Delete user
// @route     DELETE /api/users/:id
// @access    Private
exports.deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  sendResponse(user, res)
});