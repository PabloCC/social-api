const { UNAUTHORIZED_TEXT, EXPIRED_TOKEN_TEXT, DEFAULT_ERROR_TEXT, CONFLICT_TEXT } = require("./constants");

function defaultError(res) {
  return res
    .status(500)
    .send({ message: DEFAULT_ERROR_TEXT });
}

function unauthorizedError(res) {
  return res
    .status(403)
    .send({ message: UNAUTHORIZED_TEXT });
}

function expiredTokenError(res) {
  return res
    .status(401)
    .send({ message: EXPIRED_TOKEN_TEXT });
}

function notFoundError(res) {
  return res
    .status(404)
    .send({ message: NOT_FOUND_TEXT });
}

function conflictError(res) {
  return res
    .status(409)
    .send({ message: CONFLICT_TEXT });
}

module.exports = {
  defaultError,
  unauthorizedError,
  expiredTokenError,
  notFoundError,
  conflictError,
}