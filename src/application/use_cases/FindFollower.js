function FindFollower(id, userId, followerId, { followerRepository }) {
  if (id) {
    return followerRepository.findOneById(id);
  }
  
  return followerRepository.findOneByUser(userId, followerId);
}

module.exports = FindFollower;