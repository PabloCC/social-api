
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