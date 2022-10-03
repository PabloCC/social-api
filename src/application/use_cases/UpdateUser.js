
const User = require('../../domain/models/User');
const PasswordManager = require('../security/PasswordManager');

async function UpdateUser(id, firstName, lastName, email, { userRepository }) {
  const userToUpdate = new User(id, firstName, lastName, email);
  return userRepository.updateUser({ _id: id}, userToUpdate);
};

module.exports = UpdateUser;