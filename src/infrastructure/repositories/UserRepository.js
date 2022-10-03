
const userRepository = {
  getAll: async function() {
    const { User } = this.getSchemas();
    return await User.find({})
      .lean()
      .exec();
  },

  persist: async function(userModel) {
    const { User } = this.getSchemas();
    const { firstName, lastName, email, password } = userModel;
    const user = new User({firstName, lastName, email, password});
    return await user.save();
  },

  findOneByEmail: async function(email) {
    const { User } = this.getSchemas();
    return await User.findOne({email})
      .lean()
      .exec();
  },

  findOneById: async function(id) {
    const { User } = this.getSchemas();
    return await User.findById(id)
      .lean()
      .exec();
  },

  deleteUser: async function(id) {
    const { User } = this.getSchemas();
    return await User.deleteOne({_id: id})
      .lean()
      .exec();
  },

  updateUser: async function(query, user) {
    const { User } = this.getSchemas();
    return await User.updateOne(query, user)
      .lean()
      .exec();
  }
};


module.exports.init = function init({ User }) {
  return Object.assign(Object.create(userRepository), {
    getSchemas() {
      return {
        User,
      };
    },
  });
};