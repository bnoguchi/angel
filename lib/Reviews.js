module.exports = Reviews;

function Reviews (angel) {
  this.angel = angel;
}

Reviews.prototype.get = function (reviewId, callback) {
  return this.angel.request('/reviews/' + reviewId, callback);
};

Reviews.prototype.forUser = function (userId, callback) {
  if (typeof userId === 'function') {
    callback = userId;
    userId = null;
  }
  var opts = {};
  if (userId) {
    opts.qs = {user_id: userId};
  }
  return this.angel.request('/reviews', opts, callback);
};
