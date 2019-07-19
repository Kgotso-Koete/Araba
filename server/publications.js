Meteor.publish('posts', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({}, options);
}); 

Meteor.publish('singlePost', function(id) {
  check(id, String)
  return Posts.find(id);
});
  
Meteor.publish('comments', function(postId) {
  check(postId, String);
  return Comments.find({postId: postId}, {sort: {submitted: -1}});
});
  
Meteor.publish('replies', function(postId) {
  if(postId){
    check(postId, String); 
    return Replies.find({commentId: postId},{sort: {submitted: -1}});
  } 
});    
    
Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});    
  