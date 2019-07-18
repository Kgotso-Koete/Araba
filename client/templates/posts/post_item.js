Template.postItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  submittedText: function() {
    return this.submitted.toDateString('en-US');  
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  },
  postUrl: function(){
    return this.shortUrl ? this.shortUrl : this.url;
  }  
}); 
  
Template.postItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
}); 