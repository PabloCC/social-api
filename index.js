const server = require('./src/infrastructure/webserver/server');
const env = require('./src/infrastructure/config/env');
const db = require('./src/infrastructure/orm/mongoose');
const UserRepository = require('./src/infrastructure/repositories/UserRepository');
const FollowerRepository = require('./src/infrastructure/repositories/FollowerRepository');

const dbInstance = db.init(env.DB_CONNECTION_STRING);

const userRepository = UserRepository.init(dbInstance.schemas);
const followerRepository = FollowerRepository.init(dbInstance.schemas);

const repositories = {
  userRepository,
  followerRepository,
};


try {
  // Connect to database
  dbInstance.connect()
  .then(() => {
    // Start server
    const serverInstance = server.create(repositories);
    server.start(serverInstance);
  });
} catch(err) {
  console.log(err);
  process.exit(1);
}
