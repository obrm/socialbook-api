const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const User = require('../models/User')

// @desc        Auth user & get token
// @route       POST /api/users/login
// @access      Public
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    })
  } else {
    res.status(401).json('Email or password is incorrect')
  }
})

// @desc        Register a new user
// @route       POST /api/users
// @access      Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).json('user already exists')
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName,
      lastName,
      email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json('Invalid credentials')
  }
})
