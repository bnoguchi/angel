module.exports = Search;

function Search (angel) {
  this.angel = angel
}

/**
 * @param {String} query is the string we'd like to search for
 * @param {String} type can be one of 'User', 'Startup', 'MarketTag',
 *   'LocationTag'
 * @param {Function} callback(err, results)
 */
Search.prototype.get(query, type, callback) {
  if (typeof type === 'function') {
    callback = type;
    type = null;
  }
  var qs = {query: query};
  if (type) qs.type = type;
  return this.angel.request('/search', {qs: qs}, callback);
};

Search.prototype.slugs = function (slug, callback) {
  return this.angel.request('/search/slugs', {qs: {query: slug}}, callback);
};
