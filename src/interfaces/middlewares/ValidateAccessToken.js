const jwt = require('jsonwebtoken');
const moment = require('moment');
const env = require('../../infrastructure/config/env');

function ValidateAccessToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' });
  }

  const token = req.headers.authorization.split(" ")[1];
  const payload = jwt.verify(token, env.TOKEN_SECRET);

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'El token ha expirado' });
  }

  req.user = payload.sub;
  next();
};

module.exports = ValidateAccessToken;
