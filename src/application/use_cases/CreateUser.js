
const User = require('../../domain/models/User');

function CreateUser(firstName, lastName, email, password, { userRepository }) {
  const user = new User(null, firstName, lastName, email, password);
  return userRepository.persist(user);
};

module.exports = CreateUser;