// Description:
//   Play NBA Schedule through hubot
//
// Dependencies:
//
//
// Commands:
//   hubot deal - Puts you in the current blackjack game.  Starts a new game if there is none.
//   hubot hit - Adds 1 card to your hand
//   hubot stand - Holds your current total until the end of the round
//
//
// Author:
//   Ryan Fisher and Austin Crane
function json(obj) {
	return JSON.parse(obj)
}
const lessThanWeek = 604800000; // time difference between todays date to a week after

// reply with week schedule for NBA

module.exports = function(robot) {
	robot.respond(/this week schedule \w+/i, function(msg) {
    var urlDate = new Date();
    urlYear = urlDate.getFullYear();
    robot.http("http://api.sportradar.us/nfl-ot1/games/"+urlYear+"/REG/schedule.json?api_key=y5u9zz6jrsa9jw4nqk6v25zn")
         .header('Content-Type', 'application/json')
         .get() (function(err, res, body){
           var duh_body = json(body);
           var thisWeek = [] ;
           duh_body.weeks.forEach(function(item){
             var todaysDate = new Date();
             var weekDate = new Date(item.games[0].scheduled);
             var timeDiff =  Math.abs(todaysDate.getTime() - weekDate.getTime());
             if(timeDiff < lessThanWeek ){
               thisWeek[thisWeek.length] = item; //today might be end of the week so may be we want to grab more than one week schedule
             }
           })

           thisWeek.forEach(function(week){
             week.games.forEach(function(item){
               var date = new Date(item.scheduled);
               msg.send(item.home.name + " vs " + item.away.name + " at " + date.toISOString().substr(0,10) + " venue: " + item.venue.name + ", " + item.venue.city);
             })
           });
         });
  });
}
