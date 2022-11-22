const ListFollowersByUser = require('../../application/use_cases/ListFollowersByUser');
const ListFollowingsByUser = require('../../application/use_cases/ListFollowingsByUser');
const FollowUser = require('../../application/use_cases/FollowUser');
const FindFollower = require('../../application/use_cases/FindFollower');
const UnfollowUser = require('../../application/use_cases/UnfollowUser');
const { conflictError, defaultError, notFoundError } = require('../responses/errors');

function init ({ followerRepository }) {
  /**
   * List followers by user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - List of followers
   */
  async function listFollowersByUser(req, res) {
    const { userId } = req.params;
    const followers = await ListFollowersByUser(userId, { followerRepository }) || [];
    return res.send({data: { 
      user: userId,
      followers 
    }});
  }

  /**
   * List followings by user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - List of followings
   */
  async function listFollowingsByUser(req, res) {
    const { userId } = req.params;
    const followings = await ListFollowingsByUser(userId, { followerRepository }) || [];
    return res.send({data: {
      user: userId,
      followings
    }});
  }

  /**
   * Follow user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - Follower
   */
  async function followUser(req, res) {
    const { userId } = req.params;
    const { followerId } = req.body;

    const followerFounded = await FindFollower(null, userId, followerId, { followerRepository });
    if (followerFounded) {
      return conflictError(res);
    }

    try {
      const follower = await FollowUser(userId, followerId, { followerRepository });
      return res
        .status(201)
        .send({
          data: {
            follower
          }
        });
    } catch (err) {
      return defaultError(res);
    }
  }

  /**
   * Unfollow user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - Follower
   */
  async function unfollowUser(req, res) {
    const { id } = req.params;

    const follow = await FindFollower(id, null, null, { followerRepository });
    if (!follow) {
      return notFoundError(res);
    }

    try {
      await UnfollowUser(id, { followerRepository });
      return res
        .send({
          data: {
            follow
          }
        });
    } catch (err) {
      return defaultError(res);
    }
  }

  return {
    listFollowersByUser,
    followUser,
    listFollowingsByUser,
    unfollowUser,
  };
}

module.exports.init = init;
