Session.set('show_reply_id', 'null'); 
    
Deps.autorun(function() {
  return Meteor.subscribe("replies", Session.get("show_reply_id"));
});
  
Template.commentItem.helpers({
    submittedText: function() {
      return this.submitted.toDateString('en-US');  
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
    if(this._id) 
    { 
      $("." + "btn_" + this._id).text("Hide reply box"); 
      $(".btn_" + this._id).addClass('remove_reply_box'); 
      
      if(Meteor.user())
      {
        $(".replyBox_" + this._id).removeClass('hidden');
      }
      else
      {
        $( ".replyError_" + this._id ).removeClass('hidden');
      }
    }   
  },
    
  'click .remove_reply_box':function(){
    if(this._id) 
    { 
      $(".btn_" + this._id).text("Respond to comment"); 
      $(".btn_" + this._id).removeClass("remove_reply_box");
      $(".replyBox_" + this._id).addClass('hidden');  

      if(!Meteor.user())
      {
        $( ".replyError_" + this._id ).addClass('hidden');
      }
    }      
  }
  
  
});   

