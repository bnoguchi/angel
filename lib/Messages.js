module.exports = Messages;

function Messages (angel) {
  this.angel = angel;
}

/**
 * Returns threads that the authenticated user is involved in.
 * Requires scope message
 *
 * @param {String} view is either 'inbox', 'unread', or 'sent'
 * @param {Function} callback(err, threads)
 */
Messages.prototype.get = function (view, callback) {
  if (typeof view === 'function') {
    callback = view;
    view = null;
  }
  var opts = view ? {view: view} : {};
  return this.angel.request('/messages', opts, callback);
};

Messages.prototype.forThread = function (threadId, callback) {
  return this.angel.request('/messages/' + threadId, callback);
};

Messages.prototype.replyToThread = function (body, threadId, callback) {
  return this.angel.request('/messages', {
    method: 'POST'
  , qs: {
      body: body
    , thread_id: threadId
    }
  }, callback);
};

Messages.prototype.sendToUser = function (body, userId, callback) {
  return this.angel.request('/messages', {
    method: 'POST'
  , qs: {
      body: body
    , recipient_id: userId
    }
  }, callback);
};

Messages.prototype.mark = function (threadIds, callback) {
  return this.angel.request('/messages', {
    method: 'POST'
  , qs: {thread_ids: threadIds.join(',')}
  }, callback);
};
