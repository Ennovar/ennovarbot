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
	return JSON.parse(obj)
}
// pretty cards
function prettyCard(card) {
	return card.suit + ' ' + card.rank
}
function showHand(robot, msg, user) {
 	msg.send("Your current hand: ");
 	//robot.messageRoom(msg.message.user.name, "Your current hand: ");
 	for(var i = 0; i < user.hand.length; i++){
 		msg.send(user.hand[i].suit + ' ' + user.hand[i].rank);
 		//robot.messageRoom(msg.message.user.name, user.hand[i].suit  ' '  user.hand[i].rank);
 	}
 }


 // var blackjack_url = "http://localhost:1337";
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
	hit: function(callback) {
		robot.http(blackjack_url + "/dealer/hit")
			.get()(function(err, res, body){
				console.log(body)
				// return json object with 1 cards
				return callback(json(body)[0])
			});
	}
};

var users = [];

module.exports = function(robot) {
	robot.respond(/deal/i, function(msg) {
			var user = {};

			//Check for new user
			var newUser = true;
			for(var i = 0; i < users.length; i++){
				if(users[i].name == msg.message.user.name.toLowerCase()){
					newUser = false;
					msg.send('You have already been dealt cards this round!');
				}
			}
			if(newUser){
				user.name = msg.message.user.name.toLowerCase();
				// here is the example i sent you
				BJAPI.deal(function(cards){
					user.hand = cards;
					showHand(robot, msg, user);
				})
				// user.hand = Dealer.deal();
				user.canHit = true;
				users.push(user);

				msg.send('Good luck, ' + user.name);
			}
		});

    robot.respond(/hit/i, function(msg) {
		//check if player is in game and status == canHit

		//deal 1 card, show hand

		//set canHit based on total
		//if busted, display BUSTED message
		BJAPI.hit(function(card){
			msg.send(prettyCard(card))
			for(var i = 0; i < users.length; i++){
				if(users[i].name == msg.message.user.name.toLowerCase()){
					users[i].hand.push(card)
				}
			}

		})
        msg.send('');
    });

	robot.respond(/stand/i, function(msg) {
		//check if player is in game and status == canHit
		for(var i = 0; i < users.length; i++){
			if(users[i].name == msg.message.user.name.toLowerCase()){
				for (var j = 0; j < users[i].hand.length; j++) {
					var card = users[i].hand[j];
					msg.send(prettyCard(card))
				}
			}
		}

		//set canHit to false
        msg.send('');
    });
}
