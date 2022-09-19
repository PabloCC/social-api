const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../../config/config');

const AuthServiceClass = class {

  createToken(user) {
    const payload = {
      sub: user,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix(),
    };

    return jwt.sign(payload, config.TOKEN_SECRET);
  }
}

let singleton;

const AuthService = function() {
  if (typeof singleton === 'undefined') {
    singleton = new AuthServiceClass();
  }

  return singleton;
}

module.exports = AuthService;
