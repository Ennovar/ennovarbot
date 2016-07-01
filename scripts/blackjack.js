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
 	//msg.send("Your current hand: ");
 	robot.messageRoom(msg.message.user.name, "Your current hand: ");
 	for(var i = 0; i < user.hand.length; i++){
 		//msg.send(user.hand[i].suit + ' ' + user.hand[i].rank);
 		robot.messageRoom(msg.message.user.name, user.hand[i].suit  ' '  user.hand[i].rank);
 	}
	
	//TODO: Calculate and show total
	
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
				// return json object with 1 cards
				return callback(json(body)[0])
			});
	}
};

var users = [];

//Game logic
function StartGame(){
	
}

function CheckEnd(robot, msg){
	var allStand = true;
	for(var i = 0; i < users.length; i++){
		if(users[i].canHit){
			allStand = false;
		}
	}
	if(allStand){
		EndGame(robot, msg);
	}
}

function EndGame(robot, msg){
	for(var i = 0; i < users.length; i++){
		//Stop any active timers
		clearTimeout(users[i].timeoutId);
		
		//Tell users game is over
		//msg.send("Game over");
		robot.messageRoom(msg.message.user.name, "Game over");
	}
	console.log("Game end");
	//clear users
	users = [];
}

module.exports = function(robot) {
	robot.respond(/deal/i, function(msg) {
		//Start game if first player
		if(users.length == 0){
			StartGame();
		}
		
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
			BJAPI.deal(function(cards){
				user.hand = cards;
				showHand(robot, msg, user);
			})
			user.canHit = true;
			//Start 60 second timer to automatically stand player if they go inactive
			user.timeoutId = setTimeout(function(){ user.canHit = false; msg.send("1 - Automatically Standing due to inactivity"); CheckEnd(robot, msg); }, 60000);
			users.push(user);

			msg.send('Good luck, ' + user.name);
		}
	});

    robot.respond(/hit/i, function(msg) {
		var user = msg.message.user.name.toLowerCase();
		
		//check if player is in game and status == canHit
		var ingame = false;
		var canHit = false;
		var id;
		for(var i = 0; i < users.length; i++){
			if(users[i].name == user){
				ingame = true;
				canHit = users[i].canHit;
				id = i;
			}
		}
		if(ingame){
			if(canHit){
				//reset idle timer
				clearTimeout(users[id].timeoutId);
				users[id].timeoutId = setTimeout(function(){ users[id].canHit = false; msg.send("2 - Automatically Standing due to inactivity"); CheckEnd(robot, msg); }, 60000);
				
				//deal 1 card, show hand
				BJAPI.hit(function(card){
					users[id].hand.push(card);
					showHand(robot, msg, users[id])
				});
				
				//TODO: set canHit based on total
				//if busted, display BUSTED message
				
			}
			else{
				msg.send("You can't have any more cards this round");
			}
		}
		else{
			msg.send('You are not in the game yet.  Type "bot deal" to get your cards');
		}
    });

	robot.respond(/stand/i, function(msg) {
		var user = msg.message.user.name.toLowerCase();
		
		//check if player is in game and status == canHit
		var ingame = false;
		var canHit = false;
		var id;
		for(var i = 0; i < users.length; i++){
			if(users[i].name == user){
				ingame = true;
				canHit = users[i].canHit;
				id = i;
			}
		}
		if(ingame){
			if(canHit){
				//stop timer
				clearTimeout(users[id].timeoutId);
				
				//set canHit to false
				users[id].canHit = false;
				
				//TODO: Show total
				msg.send("Your hand total this round is: ");
				
				//TODO: Check if all players are standing
				//if so, end round, display winners, and clear users
				CheckEnd(robot, msg);
			}
			else{
				msg.send("You are already standing");
			}
		}
		else{
			msg.send('You are not in the game yet.  Type "bot deal" to get your cards');
		}
    });
}
