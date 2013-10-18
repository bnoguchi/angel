module.exports = Jobs;

function Jobs (angel) {
  this.angel = angel;
}

Jobs.prototype.list = function (callback) {
  return this.angel.request('/jobs', callback);
};

Jobs.prototype.get = function (id, callback) {
  return this.angel.request('/jobs/' + id, callback);
};

Jobs.prototype.byStartup = function (startupId, callback) {
  return this.angel.request('/startups/' + startupId + '/jobs', callback);
};

Jobs.prototype.taggedWith = function (tagId, callback) {
  return this.angel.request('/tags/' + tagId + '/jobs', callback);
};
