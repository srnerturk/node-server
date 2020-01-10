const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  },
  isAdmin: false,
  isDeleted: false
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey'));
  return token;
}

const User = mongoose.model('User', UserSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    name: Joi.string().min(3).max(255).required().email(),
    name: Joi.string().min(6).max(50).required(),
  }
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;