// Fixture data
if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var kool_herc_id = Meteor.users.insert({ profile: { name: 'DJ Kool Herc' }});
  var Kool_Herc = Meteor.users.findOne(kool_herc_id);

  var master_flash_id = Meteor.users.insert({ profile: { name: 'Grand Master Flash' }});
  var Master_Flash = Meteor.users.findOne(master_flash_id);
 
  var IDC_Id = Posts.insert({
    title: 'IDC SME funding',
    userId: Master_Flash._id,
    author: Master_Flash.profile.name,
    question: 'Has anyone sucessfully raised finance from the IDC for a software company? if so what steps did you follow?',
    submitted: new Date(now - 7 * 3600 * 1000),
    commentsCount: 2,
    upvoters: [],
    votes: 0
  });   

  var IDC_comment_1 = Comments.insert({
    postId: IDC_Id,
    userId: Kool_Herc._id,
    author: Kool_Herc.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Unfortunately the IDC only backs companies that can provide jobs in the medium term. You are better of getting VC'
  });

  var IDC_comment_2 = Comments.insert({
    postId: IDC_Id,
    userId: Master_Flash,
    author: Master_Flash.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'Have you tried joining any of the local accelerators? Some offer seed funding'
  });

  Replies.insert({
    commentId: IDC_comment_1,
    userId: Master_Flash._id,
    author: Master_Flash.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'That is not actually completely true. I know a friend who was backed by the IDC'
  });

  Replies.insert({
    commentId: IDC_comment_1,
    userId: Kool_Herc._id,
    author: Kool_Herc.profile.name,
    submitted: new Date(now - 10 * 5000 * 1000),
    body: 'Oh interesting, please tell me more about this person backed by the IDC?'
  }); 

  Replies.insert({
    commentId: IDC_comment_1,
    userId: Master_Flash._id,
    author: Master_Flash.profile.name,
    submitted: new Date(now - 12 * 10000 * 1000),
    body: 'She built software to that matched worker type x to hiring firm tybe b, so the employmenent creation proposition was clear'
  }); 

  // second set of replies
  Replies.insert({
    commentId: IDC_comment_2,
    userId: Master_Flash._id,
    author: Master_Flash.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'I am a graduate of accelerator ABC and it was quite enriching'
  });

  Replies.insert({
    commentId: IDC_comment_2,
    userId: Kool_Herc._id,
    author: Kool_Herc.profile.name,
    submitted: new Date(now - 10 * 5000 * 1000),
    body: 'I always wonder about weather bootstrapping would be better'
  }); 

  Replies.insert({
    commentId: IDC_comment_2,
    userId: Master_Flash._id,
    author: Master_Flash.profile.name,
    submitted: new Date(now - 12 * 10000 * 1000),
    body: 'You never know untill you try'
  }); 
  
  for (var i = 0; i < 10; i++) {
    Posts.insert({
      title: 'Test question #' + i,
      author: Master_Flash.profile.name,
      userId: Master_Flash._id,
      question: 'How do I build a software company that integrates internet technology with African culture?' + i,
      submitted: new Date(now - i * 3600 * 1000 + 1),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });
  }
}