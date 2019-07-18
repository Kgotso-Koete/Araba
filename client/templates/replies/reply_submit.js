Template.replySubmit.onCreated(function() {
    Session.set('replySubmitErrors', {});
  });
  
  Template.replySubmit.helpers({
    errorMessage: function(field) {
      return Session.get('replySubmitErrors')[field];
    },
    errorClass: function (field) {
      return !!Session.get('replySubmitErrors')[field] ? 'has-error' : '';
    }
  });
        
  Template.replySubmit.events({
    'submit form': function(e, template) {
      e.preventDefault();
  
      var $body = $(e.target).find('[name=body]');
      var reply = {
        body: $body.val(),
        commentId: template.data._id,
        postId:Comments.find({_id:template.data._id}).fetch()[0].postId
      };  
  
      var errors = {};
      if (! reply.body) {
        errors.body = "Please write a reply";
        return Session.set('replySubmitErrors', errors);
      }
   
      Meteor.call('replyInsert', reply, function(error, replyId) {
        if (error){
          throwError(error.reason);
        } else {
          $body.val('');
        }
      }); 
    }
  });  