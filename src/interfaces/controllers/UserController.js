const ListUsers = require('../../application/use_cases/ListUsers');
const CreateUser = require('../../application/use_cases/CreateUser');
const FindUser = require('../../application/use_cases/FindUser');
const DeleteUser = require('../../application/use_cases/DeleteUser');
const UpdateUser = require('../../application/use_cases/UpdateUser');

const PasswordManager = require('../../application/security/PasswordManager');
const AccessTokenManager = require('../../application/security/AccessTokenManager');
const { unauthorizedError, conflictError, defaultError, notFoundError } = require('../responses/errors');

function init ({ userRepository }) {

  /**
   * List users
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - List of users
   */
  async function listUsers(req, res) {
    try {
      const users = await ListUsers({ userRepository });
      return res.send({data: { users }});
    } catch (err) {
      return defaultError(res);
    }
  }

  /**
   * Create user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - User created
   */
  async function createUser(req, res) {
    const { firstName, lastName, email, password } = req.body;

    const userFounded = await FindUser(false, email, { userRepository });
    if (userFounded) {
      return conflictError(res);
    }

    try {
      const user = await CreateUser(firstName, lastName, email, password, { userRepository });
      return res
        .status(201)
        .send({
          data: {
            user
          }
        });
    } catch (err) {
      console.log(err);
      return defaultError(res);
    }
  }

  /**
   * Login user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - Auth token
   */
  async function login(req, res) {
    const { email, password } = req.body;
    const user = await FindUser(false, email, {userRepository});
    if (!user) {
      return unauthorizedError(res);
    }

    const isValidPassword = await PasswordManager.isValidPassword(password, user.password);
    if (!isValidPassword) {
      return unauthorizedError(res);
    }

    const token = await AccessTokenManager.generate(user);
    return res.send({
      data: {
        token
      }
    });
  }

  /**
   * Delete user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - User deleted
   */
  async function deleteUser(req, res) {
    const { id } = req.params;
    const user = await FindUser(id, false, {userRepository});

    if (!user) {
      return res.send({
        data: {
          message: 'User not found'
        }
      });
    }

    try {
      await DeleteUser(id, {userRepository});
      return res.send({
        data: {
          user
        }
      });
    } catch (err) {
      return defaultError(res);
    }
  }

  /**
   * Update user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {Object} - User updated
   */
  async function updateUser(req, res) {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const user = await FindUser(id, false, {userRepository});
    const userFounded = await FindUser(false, email, { userRepository });

    if (!user) {
      return notFoundError(res);
    }

    if (userFounded && userFounded._id !== user._id) {
      return conflictError(res);
    }

    try {
      const userUpdated = await UpdateUser(id, firstName, lastName, email, { userRepository });
      return res.send({
        data: {
          user: userUpdated
        }
      });
    } catch (err) {
      return defaultError(res);
    }
  }

  return {
    listUsers,
    createUser,
    login,
    deleteUser,
    updateUser
  };
}

module.exports.init = init;