
const User = require('../../domain/models/User');
const PasswordManager = require('../security/PasswordManager');

async function CreateUser(firstName, lastName, email, password, { userRepository }) {
  const passwordHash = await PasswordManager.hash(password);
  const user = new User(null, firstName, lastName, email, passwordHash);
  return userRepository.persist(user);
};

module.exports = CreateUser;