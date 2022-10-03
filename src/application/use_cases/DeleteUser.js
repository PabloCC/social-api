function DeleteUser(id, { userRepository }) {
  return userRepository.deleteUser(id);
}

module.exports = DeleteUser;