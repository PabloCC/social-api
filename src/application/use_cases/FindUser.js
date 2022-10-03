function FindUser(id, email, { userRepository }) {
  if (id) {
    return userRepository.findOneById(id);
  }

  return userRepository.findOneByEmail(email);
}

module.exports = FindUser;