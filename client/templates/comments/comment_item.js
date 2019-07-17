Deps.autorun(function() {
  return Meteor.subscribe("replies", Session.get("show_reply_id"));
});

Template.commentItem.helpers({
    submittedText: function() {
      return this.submitted.toString();
    },
    replies: function() {
      return Replies.find({commentId: this._id}); 
    },
    showReplySubmit:function() {
      if(this._id === Session.get("show_reply_id"))
      {return true};
    }
  });    
   
Template.commentItem.events({

  'click .reply_button':function(event, template){

    var session_show_reply_id = Session.get("show_reply_id");
    if(session_show_reply_id !== this._id)
    {
      Session.set('show_reply_id', this._id);
      // Remove the class 'active' from potentially current active link.
      var active_button = template.find('.reply_button');
      if(active_button){ active_button.classList.remove('reply_button')}
      // Add the class 'active' to the clicked link.
      event.currentTarget.classList.add('hide_replies');
      // change the text 
      $(".hide_replies").text("Hide replies");
    }
     
  },
  
  'click .hide_replies':function(event, template){
    
    var session_show_reply_id = Session.get("show_reply_id");
    if(session_show_reply_id) 
    {
      Session.set('show_reply_id', 'null');  
      // Remove the class 'active' from potentially current active link.
      var active_button = template.find('.hide_replies');
      if(active_button){ active_button.classList.remove('hide_replies')}
      // Add the class 'active' to the clicked link.
      event.currentTarget.classList.add('reply_button');
      // change the text
      $(".reply_button").text("Show replies");
    }
  },

  'click .reply_submit_button':function(){
    var session_show_reply_id = Session.get("show_reply_id");
    var id_class = "." + this._id;
    if(this._id === session_show_reply_id) 
    {
      var reply_input = '<li><textarea name="reply" type="text" id="reply" placeholder="Please type in your reply" class="form-control" rows="2"></textarea></li>';
      $(id_class).prepend(reply_input); 
      $("." + "btn_" + this._id).text("Submit your reply"); 
      $("." + "btn_" + this._id).addClass("btn-info"); 
    }  
  } 
});   

