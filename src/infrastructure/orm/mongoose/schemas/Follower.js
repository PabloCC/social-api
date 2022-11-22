const moment = require('moment');

const {
  model,
  Schema,
} = require('mongoose');

const FollowerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  followerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  created: Date,
});

FollowerSchema.pre('save', function (next) {
  this.created = moment().toJSON();
  return next();
});

const FollowerDao = model('Follower', FollowerSchema);

module.exports = { FollowerDao };