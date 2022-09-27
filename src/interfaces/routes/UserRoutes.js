const express = require('express');
const UserController = require('../controllers/UserController');
const ValidateAccessToken = require('../middlewares/ValidateAccessToken');

const RESOURCE_NAME = '/users';
// const LOGIN_ENDPOINT = '/login';
// const SIGNUP_ENDPOINT = '/signup';

const router = new express.Router();

function init({ userRepository }) {
  const userController = UserController.init({ userRepository });

  router.get(RESOURCE_NAME, ValidateAccessToken, userController.listUsers);
  router.post(RESOURCE_NAME, userController.createUser);


  return router;
}



// router.post(LOGIN_ENDPOINT, userService.login);
// router.post(SIGNUP_ENDPOINT, userService.signup);
// router.get(RESOURCE_NAME, authMiddleware.ensureAuthenticated, userService.getAll);
// router.get(`${RESOURCE_NAME}/:id`, authMiddleware.ensureAuthenticated, userService.getById);
// router.put(`${RESOURCE_NAME}/:id`, authMiddleware.ensureAuthenticated, userService.update);
// router.delete(`${RESOURCE_NAME}/:id`, authMiddleware.ensureAuthenticated, userService.delete);

module.exports.init = init;