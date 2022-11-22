const express = require('express');
const UserController = require('../controllers/UserController');
const ValidateAccessToken = require('../middlewares/ValidateAccessToken');

const RESOURCE_NAME = '/users';

const router = new express.Router();

function init({ userRepository }) {
  const userController = UserController.init({ userRepository });

  /**
   * @api {get} /users List users
   */
  router.get(RESOURCE_NAME, ValidateAccessToken, userController.listUsers);

  /**
   * @api {post} /users Create user
   * @body {Object} userModel - User model
   */
  router.post(RESOURCE_NAME, userController.createUser);

  /**
   * @api {post} /users/login Login user
   * @body {Object} User credentials.
   */
  router.post(`${RESOURCE_NAME}/login`, userController.login);

  /**
   * @api {delete} /users/:id Delete user
   * @param {String} id - User id
   */
  router.delete(`${RESOURCE_NAME}/:id`, ValidateAccessToken, userController.deleteUser);

  /**
   * @api {put} /users/:id Update user
   * @param {String} id - User id
   * @body {Object} userModel - User model
   */
  router.put(`${RESOURCE_NAME}/:id`, ValidateAccessToken, userController.updateUser);

  return router;
}

module.exports.init = init;