Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'question', 'title').length > 0);
  }
}); 

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.question;
  }
}); 
   
Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      title: String,
      question: String
    });

    var errors = validatePost(postAttributes);
    if (errors.title || errors.question)
      throw new Meteor.Error('invalid-post', "You must set a title and question for your post"); 

    var postWithSameLink = Posts.findOne({question: postAttributes.question});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }
           
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author:user.username, 
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });
         
    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  },
    
  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var affected = Posts.update({
      _id: postId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });

    if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }
  
});

 
validatePost = function (post) {
  var errors = {};

  if (!post.title)
    errors.title = "Please fill in a headline";

  if (!post.question)
    errors.question =  "Please fill in a question";

  return errors;
} 