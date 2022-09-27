const jwt = require('jsonwebtoken');
const moment = require('moment');
const env = require('../../infrastructure/config/env');

module.exports = {
  generate(user) {
    const payload = {
      sub: user,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix(),
    };

    return jwt.sign(payload, env.TOKEN_SECRET);
  }
}
