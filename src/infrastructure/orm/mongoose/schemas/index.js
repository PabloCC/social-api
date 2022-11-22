const { UserDao } = require('./User');
const { FollowerDao } = require('./Follower');

module.exports.create = () => ({
  User: UserDao,
  Follower: FollowerDao,
})