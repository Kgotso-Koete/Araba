Template.commentItem.helpers({
    submittedText: function() {
      return this.submitted.toString();
    },
    replies: function() {
      return Replies.find({commentId: this._id}); 
    }
  });    
 
Template.commentItem.events({
  'click .reply_button':function(){
    Meteor.subscribe('replies', this._id); 
  } 
});   



