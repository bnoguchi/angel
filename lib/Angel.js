var request = require('request');
var Comments = require('./Comments');
var Jobs = require('./Jobs');
var Users = require('./Users');
var Tags = require('./Tags');
var Messages = require('./Messages');
var Reviews = require('./Reviews');
var Search = require('./Search');
var Talent = require('./Talent');

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

  if (! callback) {
    return {
      page: function (page, perPage, callback) {
        if (typeof perPage = 'function') {
          callback = perPage;
          perPage = null;
        }
        opts.qs || (opts.qs = {});
        opts.qs.page = page;
        if (perPage) opts.qs.per_page = perPage;
        return request(opts, function (err, res, json) {
          return callback(err, json);
        });
      };
    };
  }

  return request(opts, function (err, res, json) {
    return callback(err, json);
  });
};

Angel.prototype.agent = function (accessToken) {
  return Object.create(this, {
    accessToken: {value: accessToken}
  });
};

Angel.prototype.feed = function (params, callback) {
  var qs = {}
  if ('personalized' in params) qs.personalized = params.personalized ? 1 : 0;
  if ('since' in params) qs.since = +params.since;
  return this.request('/feed', {qs: qs}, callback);
};

Angel.prototype.me = function (callback) {
  return this.request('/me', callback);
};

Angel.prototype.comments = function () {
  return this._comments || (this._comments = new Comments(this));
};

Angel.prototype.jobs = function () {
  return this._jobs || (this._jobs = new Jobs(this));
};

Angel.prototype.talent = function () {
  return this._talent || (this._talent = new Talent(this));
};

Angel.prototype.users = function () {
  return this._users || (this._users = new Users(this));
};

Angel.prototype.intros = function (startupId, note, callback) {
  if (typeof note === 'function') {
    callback = note;
    note = null;
  }
  var opts = {
    method: 'POST'
  };
  if (note) opts.note = note;
  return this.request('/intros', opts, callback);
};

Angel.prototype.canTakeIntro = function (callback) {
  callback(new Error('Unimplemented: Angel.prototype.canTakeIntro'));
};

Angel.prototype.tags = function () {
  return this._tags || (this._tags = new Tags(this));
};

Angel.prototype.messages = function () {
  return this._messages || (this._messages = new Messages(this));
};

/**
 * Calls back with paths between authenticated user and given user/startup ids.
 * - For each user/startup up to 10 different paths will show up.
 * - Up to 20 requests per id are allowed.
 * - Do not use userIds and startupIds at the same time.
 */
Angel.prototype.paths = function (params, callback) {
  var qs = {};
  if (params.userIds) qs.user_ids = params.userIds.join(',');
  if (params.startupIds) qs.startup_ids = params.startupIds.join(',');

  // Can be 'followed' or 'following'
  if (params.direction) qs.direction = params.direction;

  return this.request('/paths', {qs: qs}, callback);
};

Angel.prototype.review = function () {
  return this._reviews || (this._reviews = new Reviews(this));
};

Angel.prototype.search = function () {
  return this._search || (this._search = new Search(this));
};
