module.exports = class {
  constructor(id = null, userId, followerId) {
    this.id = id;
    this.userId = userId;
    this.followerId = followerId;
  }
}