Template.postEdit.onCreated(function() {
  Session.set('postEditErrors', {});
}); 

Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  },
  formData:function(){
    return Posts.findOne({_id: Router.current().params._id});
  }
}); 
  
Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();
 
    var currentPostId = Router.current().params._id;
    var postProperties = {
      title: $(e.target).find('[name=title]').val(),
      question: $(e.target).find('[name=question]').val()
    } 

    var errors = validatePost(postProperties);
    if (errors.title || errors.url)
      return Session.set('postEditErrors', errors);

    Posts.update(currentPostId, {$set: postProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('postPage', {_id: currentPostId});
      }
    }); 
  },
 
  'click .delete': function(e) {
    e.preventDefault();
     
    if (confirm("Delete this post?")) {
      var currentPostId = Router.current().params._id;
      Posts.remove(currentPostId); 
      Router.go('home'); 
    }
  } 
});