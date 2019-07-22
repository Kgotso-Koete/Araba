Meteor.users.allow({
  update: function (userId, doc, fields, modifier) {
    return true;
} 
});

validateProfileEdit = function (edit) {
    var errors = {};
  
    if (!edit.username)
      errors.username = "Please fill in your new username";
 
    return errors;
}