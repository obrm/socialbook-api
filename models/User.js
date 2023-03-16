const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 20,
    min: 2,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
    max: 30,
    min: 2,
    required: true,
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 32,
  },
  profilePicture: {
    type: String,
    default: ''
  },
  coverPicture: {
    type: String,
    default: ''
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  description: {
    type: String,
    max: 150,
  },
  country: {
    type: String,
    max: 20,
  },
  city: {
    type: String,
    max: 20,
  },
  relationship: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6]
  }
},
  {
    timestamps: true,
  })


UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', UserSchema);
