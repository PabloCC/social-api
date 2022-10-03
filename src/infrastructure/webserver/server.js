const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('../../interfaces/routes/UserRoutes');

module.exports = {
  create: (repositories) => {
    const server = express();
    server.use(express.json());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: false}));
    server.use(express.static('public'));
    
    // Routes
    server.use(userRoutes.init(repositories));

    return server;
  },

  start: (server) => {
    server.listen(3000, () => console.log('Serving in port 3000'));
  },
}