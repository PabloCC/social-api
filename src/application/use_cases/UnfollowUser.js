function UnfollowUser(id, { followerRepository }) {
  return followerRepository.delete(id);
}

module.exports = UnfollowUser;