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


// creates a json out of a json string
function json(obj) {
	console.log(obj)
	return JSON.parse(obj)
}
// pretty cards
function prettyCard(card) {
	return card.suit + ' ' + card.rank
}

var blackjack_url = "http://blackjackapi.herokuapp.com";
var BJAPI = {
	/**
	 * deal - gets 2 cards from the dealer, use callback as a callback function to handle recieving data
	 *
	 * @param  {function} callback callback as a callback function to handle recieving data, it will have on parameter callback(cards)
	 * @return {function}          callback
	 */
	deal: function(callback) {
		robot.http(blackjack_url + "/dealer/deal")
			.get()(function(err, res, body){
				// return json object with 2 cards
				return callback(json(body))
			});
	},
};

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
			user.action = "";
			users.push(user);
			msg.send('Good luck, ' + user.name);
      BJAPI.deal(function(cards){
				msg.send(prettyCard(cards[0]) + prettyCard(cards[1]));
			})
			// msg.messageRoom(msg.message.user.name, "Your current hand: ");
			for(var i = 0; i < user.hand; i++){
				// msg.messageRoom(msg.message.user.name, user.hand[i]);
			}
		}
	});
  robot.respond(/hand/i, function(msg) {

    msg.send()
  });
}
