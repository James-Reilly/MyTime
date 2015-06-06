Template.leaderboard.helpers({
  timecards: function(){
    return Timecards.find({}, { sort: { hours: -1 }});
  }
})

Template.clock.events({
	'click .AddPlaceButton': function (e) {
      e.preventDefault();
      var name = Meteor.user().profile.name;
      
      var cards = Timecards.find({ name: name}).fetch();
      //If a user exists
      if(cards.length == 1){
        //Get th id of the user by their name
        var id = Timecards.findOne({ name: name})._id;
      	
      	if(cards[0].cur == 1){
          //Update if they are clocked in clock them out
      		Timecards.update(id, {$set:{cur: 0}});
      	}else{
          //Update if they are clocked out clock in
      		Timecards.update(id, {$set:{cur: 1}});
      	}
      	
      	
      }else{
        //If a user doesnt exist add to database
      	Timecards.insert({
      		name: name,
      		hours: 0,
      		min: 0,
      		clockedIn: Date.now(),
      		cur: 1,
      	});
      }
    }
})

Template.welcome.helpers({
  clocked_in: function(){
    var name = Meteor.user().profile.name;
    var cards = Timecards.find({ name: name}).fetch();
    if(cards.length == 1 && cards[0].cur == 1){
        return true;
        
      }else{
        return false;
      }

  }
})

Template.profileView.helpers({
    userPicHelper: function() {
        if (this.profile) {
            var id = this.profile.facebookId;
            var img = 'http://graph.facebook.com/' + id + '/picture?type=square&height=160&width=160';
            return img;
        }
    }
});