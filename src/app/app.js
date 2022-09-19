const express = require('express');
const userResource = require('./domain/resources/user');
const bodyParser = require('body-parser');

module.exports = () => {
  const app = express();
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(express.static(__dirname));
  
  app.use(userResource);

  return app;
};