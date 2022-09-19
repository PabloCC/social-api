const express = require('express');
const userService = require('../services/user');

const RESOURCE_NAME = '/users';
const router = new express.Router();

router.post('/login', userService.login);
router.post('/signup', userService.signup);

module.exports = router;