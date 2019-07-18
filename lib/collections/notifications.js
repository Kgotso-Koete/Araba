Notifications = new Mongo.Collection('notifications'); 

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) && 
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createCommentNotification = function(comment) {
  var post = Posts.findOne(comment.postId);
  if (comment.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });  
  }
};  
  
createReplyNotification = function(reply) {
  var post = Posts.findOne(reply.postId);
  if (reply.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      commentId: reply._id,
      commenterName: reply.author,
      read: false
    });  
  }
};