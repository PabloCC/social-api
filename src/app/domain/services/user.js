const userRepository = require('../../infraestructure/repositories/user');

module.exports = ({
  login(req, res) {
    return userRepository.login(req, res);
  },

  signup(req, res) {
    return userRepository.signup(req, res);
  }
});