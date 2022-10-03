const jwt = require('jsonwebtoken');
const moment = require('moment');
const env = require('../../infrastructure/config/env');
const { unauthorizedError } = require('../responses/errors'); 

function ValidateAccessToken(req, res, next) {
  if (!req.headers.authorization) {
    return unauthorizedError(res);
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const payload = jwt.verify(token, env.TOKEN_SECRET);
    
    if (payload.exp <= moment().unix()) {
      return unauthorizedError(res);
    }

    req.user = payload.sub;

  } catch (err) {
    return unauthorizedError(res);
  }
 
  next();
};

module.exports = ValidateAccessToken;
