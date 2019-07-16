Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      question: $(e.target).find('[name=question]').val(),
      title: $(e.target).find('[name=title]').val()
    }; 

    var errors = validatePost(post);
    if (errors.title || errors.question)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      // show this result but route anyway
      if (result.postExists)
        throwError('This question has already been posted');

      Router.go('postPage', {_id: result._id});  
    });
  }
});   

Template.postSubmit.onCreated(function() {
  Session.set('postSubmitErrors', {});
});
 
Template.postSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
}); 
 