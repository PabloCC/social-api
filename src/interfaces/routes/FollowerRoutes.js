const express = require('express');
const FollowerController = require('../controllers/FollowerController');
const ValidateAccessToken = require('../middlewares/ValidateAccessToken');

const RESOURCE_NAME = '/followers';

const router = new express.Router();

function init({ followerRepository }) {
  const followerController = FollowerController.init({ followerRepository });

  /**
   * @api {get} /followers/:userId List followers by user
   * @param {String} userId - User id
   */
  router.get(`${RESOURCE_NAME}/:userId`, ValidateAccessToken, followerController.listFollowersByUser);
  
  /**
   * @api {get} /followers/:userId/followings List followings by user
   * @param {String} userId - User id
   */
  router.get(`${RESOURCE_NAME}/:userId/followings`, ValidateAccessToken, followerController.listFollowingsByUser);
  
  /**
   * @api {post} /followers/:userId Follow user
   * @param {String} userId - User id
   * @body {String} followerId - Follower id
   */
  router.post(`${RESOURCE_NAME}/:userId`, ValidateAccessToken, followerController.followUser);
  
  /**
   * @api {delete} /followers/:userId/:followerId Unfollow user
   * @param {String} id - follow id
   */
  router.delete(`${RESOURCE_NAME}/:id`, ValidateAccessToken, followerController.unfollowUser);

  return router;
}

module.exports.init = init;