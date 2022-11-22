function ListFollowingsByUser(id, { followerRepository }) {
  return followerRepository.getUserFollowings(id);
}

module.exports = ListFollowingsByUser; 