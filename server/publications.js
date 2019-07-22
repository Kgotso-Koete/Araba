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
    
Meteor.publish('replies', function(commentId) {
  if(commentId){
    check(commentId, String); 
    return Replies.find({commentId: commentId},{sort: {submitted: -1}});
  } 
});    
     
Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});    
  
Meteor.publish('users', function() {
  return Meteor.users.find();  
});    