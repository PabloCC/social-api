const moment = require('moment');
const bcrypt = require('bcrypt');

const {
  model,
  Schema,
} = require('mongoose');

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  created: Date,
});

UserSchema.pre('save', function (next) {
  this.created = moment().toJSON();
  return next();
});

const UserDao = model('User', UserSchema);

module.exports = { UserDao };