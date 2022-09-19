const jwt = require('jsonwebtoken');
const moment = require('moment');
const errors = require('../../common/errors');

function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return errors.unauthorizedError(res);
  }

  const token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, config.TOKEN_SECRET);

  if (payload.exp <= moment().unix()) {
    return errors.expiredTokenError(res);
  }

  req.user = payload.sub;
  next();
};

module.exports = {
  ensureAuthenticated
}