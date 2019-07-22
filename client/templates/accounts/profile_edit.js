Template.profileEdit.onCreated(function() {
    Session.set('profileEditErrors', {});
  }); 
  
Template.profileEdit.helpers({
    errorMessage: function(field) {
      return Session.get('profileEditErrors')[field];
    },
    errorClass: function (field) {
      return !!Session.get('profileEditErrors')[field] ? 'has-error' : '';
    }
  }); 
          
  Template.profileEdit.events({
    'submit form': function(e) {
      e.preventDefault();
   
      var currentUserId = this._id;

      var userProperties = {
        username: $(e.target).find('[name=username]').val(),
      } 
         
      var errors = validateProfileEdit(userProperties);
      if (errors.username) 
        return Session.set('profileEditErrors', errors);
  
      Meteor.users.update(currentUserId, {$set: userProperties}, function(error) {
        if (error) {
          // display the error to the user
         throwError(error.reason);
        } else {
          $('.hidden').removeClass('hidden');
          setTimeout(function(){ Router.go('/'); }, 2500);
        }
      }); 
    }
  });