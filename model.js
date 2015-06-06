//Init DB
Timecards = new Meteor.Collection('timecards');

Meteor.startup(function(){
    //Call every minute
    Meteor.setInterval(function(){
    	var timeCards = Timecards.find().fetch();
    	for(i = 0; i < timeCards.length; i++) {
    		if(timeCards[i].cur == 1){
                //Save the current minutes (plus 1)
    			var minTemp = timeCards[i].min + 1;
                //Save the current hours
                var hourTemp = timeCards[i].hours;
                //if minutes is over 60 update hours
                if(minTemp >= 60){
                    minTemp = 0;
                    hourTemp += 1;
                }
                //Get the element ID by name
                //I know there could be repeat names but it works for my use_case
                var id = Timecards.findOne({ name: timeCards[i].name})._id;
    			//Update the min and hours of user
    			Timecards.update(id, {$set:{min: minTemp, hours: hourTemp}});
    					
    		}
    	}
    }, 60000);
});


Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
        user.profile = options.profile;
    }
    return user;
});
