var Timecards = new Meteor.Collection('Timecards');



if(Meteor.isClient){

  $( document ).ready(function(){
    $(".button-collapse").sideNav();
  });
  

  Template.leaderboard.helpers({
    timecards: function(){
      if(Timecards){
        return Timecards.find({}, { sort: { total: -1 }});
      }
      
    }
  });

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
            minString: "00",
            total: 0,
            clockedIn: Date.now(),
            url: "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=large",
            cur: 1,
          });
        }
      }
  });

  Template.welcome.helpers({
    clocked_in: function(){
      if(Meteor.user()){
        var name = Meteor.user().profile.name;
        if(Timecards){
          var cards = Timecards.find({ name: name}).fetch();
          if(cards.length == 1 && cards[0].cur == 1){
              return true;
              
          }else{
            return false;
          }
        }
        

      }
    }
      
  });


  Template.leader.helpers({
    /*
    getUrl: function() {
      var cards = Timecards.find({}, { sort: { total: -1 }}).fetch();
      if(cards.length > 0){
        return cards[0].url;
      }
    */

    leaderName: function() {
      var cards = Timecards.find({}, { sort: { total: -1 }}).fetch();
      if(cards.length > 0){
        return cards[0].name;
      }
    }
  });

  Template.leader.getUrl = function(){
    var cards = Timecards.find({}, { sort: { total: -1 }}).fetch();
      if(cards.length > 0){
        return cards[0].url;
      }
  };
  
}

