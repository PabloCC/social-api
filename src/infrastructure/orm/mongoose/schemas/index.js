const { UserDao } = require('./User');

module.exports.create = () => ({
  User: UserDao,
})