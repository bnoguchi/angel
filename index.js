var request = require('request');

module.exports = Angel;

function Angel (clientId, clientSecret) {
  this.clientId = clientId;
  this.clientSecret = clientSecret;
}

Angel.prototype.request = function (path, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  opts.url = 'https://api.angel.co/1' + path;
  if (this.accessToken) {
    opts.headers = opts.headers || {};
    opts.headers['Authorization'] = 'Bearer ' + this.accessToken;
  }
  if (! ('json' in opts)) opts.json = true;
  return request(opts, function (err, res, json) {
    return callback(err, json);
  });
};

Angel.prototype.agent = function (accessToken) {
  return Object.create(this, {
    accessToken: {value: accessToken}
  });
};

Angel.prototype.me = function (callback) {
  return this.request('/me', callback);
};

Angel.prototype.talent = function () {
  return this._talent || (this._talent = new Talent(this));
};

Angel.prototype.user = function () {
  return this._user || (this._user = new User(this));
};

function User (angel) {
  this.angel = angel;
}

User.prototype.get = function (id, includeDetails, callback) {
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
User.prototype.roles = function (userId, callback) {
  return this.angel.request('/users/' + userId + '/roles', callback);
};

function Talent (angel) {
  this.angel = angel;
}

Talent.prototype.startups = function (callback) {
  return this.angel.request('/talent/startups', callback);
};

Talent.prototype.candidates = function (startupId, callback) {
  return this.angel.request('/talent/candidates', {qs: {startup_id: startupId}}, callback);
};

Talent.prototype.pairing = function (params, callback) {
  var qs = {};
  qs.startup_id = params.startupId;
  if ('userId' in params) qs.user_id = params.userId;
  if ('startupNote' in params) qs.startup_note = params.startupNote;
  if ('startupInterested' in params) qs.startup_interested = params.startupInterested ? 1 : 0;
  if ('userNote' in params) qs.user_note = params.userNote;
  if ('userInterested' in params) qs.user_interested = params.userInterested ? 1 : 0;
  return this.angel.request('/talent/pairing', {
    method: 'POST'
  , qs: qs
  }, callback);
};

Talent.prototype.star = function (params, callback) {
  var qs = {};
  qs.startup_id = params.startupId;
  if ('userId' in params) qs.user_id = params.userId;
  if ('star' in params) qs.star = params.star ? 1 : 0;
  return this.angel.request('/talent/star', {
    method: 'POST'
  , qs: qs
  }, callback);
};
