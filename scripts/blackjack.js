// Description:
//   Play Blackjack through hubot
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

var users = [];

module.exports = function(robot) {
	robot.respond(/deal/i, function(msg) {
		var user = {};
		user.name = msg.message.user.name;
		user.hand = [];
		user.action = "";
		
		//Add user to game
		if(users.length == 0){
			users.push(user);
		}
		else{
			var newUser = true;
			for(var i = 0; i < users.length; i++){
				if(users[i] == user){
					newUser = false;
				}
			}
			if(newUser){
				users.push(user);
			}
		}
		
		
		msg.send('');
	});