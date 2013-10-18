module.exports = Comments;

function Comments (angel) {
  this.angel = angel;
}

Comments.prototype.forCommentable = function (commentableType, commentableId, callback) {
  return this.angel.request('/comments', {
    qs: {
      commentable_type: commentableType
    , commentable_id: commentableId
    }
  }, callback);
};

Comments.prototype.create = function (commentableType, commentableId, comment, callback) {
  return this.angel.request('/comments', {
    method: 'POST'
  , qs: {
      commentable_type: commentableType
    , commentable_id: commentableId
    , comment: comment
    }
  }, callback);
};

Comments.prototype.del = function (commentId, callback) {
  return this.angel.request('/comments/' + commentId, {method: 'DELETE'}, callback);
};
