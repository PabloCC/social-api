function defaultError(res) {
  return res
    .status(500)
    .send({ message: 'Internal server error' });
}

function forbiddenError(res) {
  return res
    .status(403)
    .send({ message: 'Forbidden' });
}

function unauthorizedError(res) {
  return res
    .status(401)
    .send({ message: 'Unauthorized' });
}

function notFoundError(res) {
  return res
    .status(404)
    .send({ message: 'Not found' });
}

function conflictError(res) {
  return res
    .status(409)
    .send({ message: 'Conflict' });
}

module.exports = {
  defaultError,
  unauthorizedError,
  forbiddenError,
  notFoundError,
  conflictError,
}