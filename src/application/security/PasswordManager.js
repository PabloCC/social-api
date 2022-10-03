const bcrypt = require('bcrypt');

module.exports = {
  isValidPassword(password, hash) {
    return bcrypt.compare(password, hash);
  },

  hash(password) {
    return bcrypt.hash(password, 10);
  }
};