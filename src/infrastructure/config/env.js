module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || "jwt-token",
  DEFAULT_ERROR_TEXT: 'Error: Internal server error',
  UNAUTHORIZED_TEXT: 'Error: Authentication failed',
  EXPIRED_TOKEN_TEXT: 'Error: Authentication token has expired',
  NOT_FOUND_TEXT: 'Error: Not found',
  CONFLICT_TEXT: 'Error: Conflict',
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || 'mongodb://root:rootpassword@localhost:27017/organism?authSource=admin',
  DB_TYPE: process.env.DB_TYPE || 'mongo',
};