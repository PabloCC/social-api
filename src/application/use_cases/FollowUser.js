const Follower = require('../../domain/models/Follower');

function FollowUser(userId, followerId, { followerRepository }) {
  const follower = new Follower(null, userId, followerId);
  return followerRepository.persist(follower);
}

module.exports = FollowUser; 