const ListUsers = require('../../application/use_cases/ListUsers');
const CreateUser = require('../../application/use_cases/CreateUser');

function init ({ userRepository }) {

  async function listUsers(req, res) {
    const users = await ListUsers({userRepository});
    
    return res.send({
      data: {
        users
      }
    });
  }

  async function createUser(req, res) {
    const { firstName, lastName, email, password } = req.body;
    const user = await CreateUser(firstName, lastName, email, password, {userRepository});
    
    return res.send({
      data: {
        user
      }
    });
  }

  return {
    listUsers,
    createUser
  };
}

module.exports.init = init;