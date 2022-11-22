const followerRepository = {
  getUserFollowers: async function(userId) {
    const { Follower } = this.getSchemas();
    return await Follower.find({userId})
      .lean()
      .exec();
  },

  getUserFollowings: async function(followerId) {
    const { Follower } = this.getSchemas();
    return await Follower.find({followerId})
      .lean()
      .exec();
  },

  persist: async function(followerModel) {
    const { Follower } = this.getSchemas();
    const { userId, followerId } = followerModel;
    const follower = new Follower({userId, followerId});
    return await follower.save();
  },

  findOneById: async function(id) {
    const { Follower } = this.getSchemas();
    return await Follower.findById(id)
      .lean()
      .exec();
  },

  findOneByUser: async function(userId, followerId) {
    const { Follower } = this.getSchemas();
    return await Follower.findOne({userId, followerId})
      .lean()
      .exec();
  },

  delete: async function(id) {
    const { Follower } = this.getSchemas();
    return await Follower.deleteOne({_id: id})
      .lean()
      .exec();
  }
};

module.exports.init = function init({ Follower }) {
  return Object.assign(Object.create(followerRepository), {
    getSchemas() {
      return {
        Follower,
      };
    },
  });
};