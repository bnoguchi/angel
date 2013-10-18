module.exports = Tags;

function Tags (angel) {
  this.angel = angel;
}

Tags.prototype.get = function (tagId, callback) {
  return this.angel.request('/tags/' + tagId, callback);
};

Tags.prototype.children = function (tagId, callback) {
  return this.angel.request('/tags/' + tagId + '/children', callback);
};

Tags.prototype.parents = function (tagId, callback) {
  return this.angel.request('/tags/' + tagId + '/parents', callback);
};
