Replies = new Mongo.Collection('replies'); 

Meteor.methods({
    replyInsert: function(replyAttributes) {
      check(this.userId, String);
      check(replyAttributes, {
        commentId: String,
        postId:String,
        body: String
      });
   
      var user = Meteor.user();
      var comment = Comments.findOne(replyAttributes.commentId); 
  
      if (!comment)
        throw new Meteor.Error('invalid-reply', 'You must repy to a comment');
   
      reply = _.extend(replyAttributes, {
        userId: user._id,
        author: user.username,
        submitted: new Date()
      });
      
      // update the post with the number of comments
      Posts.update(reply.postId, {$inc: {commentsCount: 1}});  
      
      // create the reply, save the id
      reply._id = Replies.insert(reply);

      // now create a notification, informing the user that there's been a comment
      //createCommentNotification(comment);

      return reply._id; 
    } 
  }); 

