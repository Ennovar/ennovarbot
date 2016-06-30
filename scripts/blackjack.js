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

		//Check for new user
		var newUser = true;
		for(var i = 0; i < users.length; i++){
			if(users[i] == user){
				newUser = false;
				msg.send('You are already playing!');
			}
		}
		if(newUser){
			user.name = msg.message.user.name.toLowerCase();
			user.hand = Deck.deal();
			user.action = "";
			users.push(user);
		}
	}

	msg.send('');
	});
