const express = require('express');
const messageService = require('../services/message');
const authMiddleware = require('../middlewares/auth');

const RESOURCE_NAME = '/messages';
const router = new express.Router();

router.get(RESOURCE_NAME, messageService.get);
router.post(RESOURCE_NAME, authMiddleware.ensureAuthenticated, messageService.post);

module.exports = router;