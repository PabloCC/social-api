const mongoose = require('mongoose');
const model = require('../../domain/models/user');
const User = mongoose.model('User', model);
const errors = require('../../common/errors');
const AuthService = require('../../domain/services/auth');

module.exports = {

  login: function(req, res) {
    User.findOne({email: req.body.email}, (err, user) => {
      if (err) {
        return errors.defaultError(res);      
      }

      if (!user) {
        return errors.notFound(res);
      }

      if (user.password === req.body.password) {
        const _authService = new AuthService();
        const token = _authService.createToken(user);
        res.send({token: token});
      } else {
        return errors.unauthorizedError(res);
      }
    });
  },

  signup: function(req, res) {
    req.body._id = new mongoose.Types.ObjectId();
    const user = new User(req.body);

    User.findOne({email: user.email}, (err, userFounded) => {
      if (err) {
        return errors.defaultError(res);      
      }

      if (userFounded) {
        return errors.conflictError(res);
      }

      user.save((err) => {
        if (err) {
          return errors.defaultError(res);
        }
  
        res.send(user);
      });
    });
  }
}