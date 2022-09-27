/*
  It can be published as private npm module shared among all team's projects.
*/
const mongoose = require('mongoose');
const schemas = require('./schemas');

module.exports.init = (dbConnectionString) => {
  if (!dbConnectionString) {
    throw new Error('add correct format of config with dbConnectionString');
  }
  // Check for errors on connecting to Mongo DB
  mongoose.connection.on('error', (err) => {
    console.error(`Error! DB Connection failed. Error: ${err}`);
    return err;
  });
  // Connection opened successfully
  mongoose.connection.once('open', () => {
    console.log('Connection to MongoDB established');
    // mongoose.connection.db.dropDatabase()
  });
  mongoose.connection.on('disconnected', () => {
    console.log('Connection to MongoDB closed');
    console.log('-------------------');
  });

  return {
    getConnection() {
      return mongoose.connection;
    },
    connect() {
      // Open Connection to Mongo DB
      return mongoose.connect(dbConnectionString);
    },
    close() {
      return mongoose.connection.close();
    },
    schemas: schemas.create(),
  };
};
