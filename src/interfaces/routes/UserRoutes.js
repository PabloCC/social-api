const express = require('express');
const UserController = require('../controllers/UserController');
const ValidateAccessToken = require('../middlewares/ValidateAccessToken');

const RESOURCE_NAME = '/users';

const router = new express.Router();

function init({ userRepository }) {
  const userController = UserController.init({ userRepository });

  router.get(RESOURCE_NAME, ValidateAccessToken, userController.listUsers);
  router.post(RESOURCE_NAME, userController.createUser);
  router.post(`${RESOURCE_NAME}/login`, userController.login);
  router.delete(`${RESOURCE_NAME}/:id`, ValidateAccessToken, userController.deleteUser);
  router.put(`${RESOURCE_NAME}/:id`, ValidateAccessToken, userController.updateUser);

  return router;
}

module.exports.init = init;