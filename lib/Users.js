module.exports = Users;

function Users (angel) {
  this.angel = angel;
}

Users.prototype.get = function (id, includeDetails, callback) {
  if (typeof includeDetails === 'function') {
    callback = includeDetails;
    includeDetails = null;
  }
  var opts = includeDetails ? {qs: {includeDetails: includeDetails}} : {};
  return this.angel.request('/users/' + id, opts, callback);
};

/**
 * Calls back with user ids grouped by 'yes', 'no', 'matched', 'interested',
 * 'starred', 'all'
 * @param {Number} userId
 * @param {Function} callback
 */
Users.prototype.roles = function (userId, callback) {
  return this.angel.request('/users/' + userId + '/roles', callback);
};

Users.prototype.batch = function (userIds, callback) {
  if (userIds.length > 50) {
    return callback(new Error('No more than 50 ids allowed for AngelList call to /users/batch'));
  }
  return this.angel.request('/users/batch', {qs: {ids: userIds.join(',')}}, callback);
};

Users.prototype.search = function (params, callback) {
  if (params.slug) {
    return this.angel.request('/users/search', {qs: {slug: params.slug}}, callback);
  }
  if (params.md5) {
    return this.angel.request('/users/search', {qs: {md5: params.md5}}, callback);
  }
  return callback(new Error('AngelList /users/search must include the slug or md5 parameter'));
};

Users.prototype.taggedWith = function (tagId, options, callback) {
  var opts = {};
  if (options) {
    var qs = {};
    if ('includeChildren' in options) qs.include_children = options.includeChildren ? 1 : 0;
    if ('includeParents' in options) qs.include_parents = options.includeParents ? 1 : 0;

    // Can be 'by_activity' or 'by_residence'
    if (options.investors) qs.investors = options.investors;
    opts.qs = qs;
  }
  return this.angel.request('/tags/' + tagId + '/users', opts, callback);
};
