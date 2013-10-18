module.exports = Talent;

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
