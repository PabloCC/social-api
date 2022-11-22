function ListFollowersByUser(id, { followerRepository }) {
  return followerRepository.getUserFollowers(id);
}

module.exports = ListFollowersByUser; 