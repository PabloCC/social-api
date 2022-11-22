const express = require('express');
const FollowerController = require('../controllers/FollowerController');
const ValidateAccessToken = require('../middlewares/ValidateAccessToken');

const RESOURCE_NAME = '/followers';

const router = new express.Router();

function init({ followerRepository }) {
  const followerController = FollowerController.init({ followerRepository });

  router.get(`${RESOURCE_NAME}/:userId`, ValidateAccessToken, followerController.listFollowersByUser);
  router.get(`${RESOURCE_NAME}/followings/:userId`, ValidateAccessToken, followerController.listFollowingsByUser);
  router.post(`${RESOURCE_NAME}/:userId`, ValidateAccessToken, followerController.followUser);
  router.delete(`${RESOURCE_NAME}/:id`, ValidateAccessToken, followerController.unfollowUser);

  return router;
}

module.exports.init = init;