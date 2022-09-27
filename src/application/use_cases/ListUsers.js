function ListUsers({ userRepository }) {
  return userRepository.getAll();
}

module.exports = ListUsers;