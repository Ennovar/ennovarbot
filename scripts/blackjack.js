
/*
Game setup functions
 */
// setup deck of cards
function getCards(suits, ranks) {
 var cards = [];
 // for each suit create all of the ranks cards
 for (var i = 0; i < suits.length; i++) {
   var suit = suits[i];
   // for each rank create a card for it
   for (var j = 0; j < ranks.length; j++) {
     var rank = ranks[j];
     // create a json object to represent our cards with a suit and a rank
     cards.push({suit: suit, rank: rank});
   }
 }
 return cards
}

// Card suits
var suits = [':diamonds:',':hearts:', ':clubs:', ':spades:'];
// Card ranks 1-K
var ranks = ['A', 'K', 'Q', 'J', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
var cards = getCards(suits, ranks);

var Deck = {
  cards: cards,
  // get numCards from the deck
  getCards: function(numCards) {
    var cards = []
    for (var i = 0; i < numCards; i++) {
      cards.push(this.cards[Math.floor(Math.random()*this.cards.length)])
    }
    return cards;
  }
}

var Dealer = {
  deck: Deck,
  // Deals two cards from the deck
  deal: function() {
    return this.deck.getCards(2)
  }

}

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

<<<<<<< HEAD

//var blackjack_url = "http://localhost:8000/";
//var blackjack_url = "http://10.16.20.22:3000/";
var blackjack_url = "http://blackjackapi.herokuapp.com";

var BJAPI = {
  start: function(callback){
    robot.http(blackjack_url + '/dealer/start')
         .header('Content-Type', 'application/json')
         .post() (function(err, resp, body) {
           if(err){
             throw "broke at start"
           }
           return callback()
         });
  },
	deal: function(username, shouldStart, callback) {
		var user = {
			username: username,
			start: shouldStart
		}
		robot.http(blackjack_url + "/dealer/deal")
				 .header('Content-Type', 'application/json')
         .post(JSON.stringify({username: username, start: shouldStart})) (function(err, resp, body) {
           return callback(json(body))
         });
	},
	hit: function(username, callback) {
		robot.http(blackjack_url + "/dealer/hit")
         .header('Content-Type', 'application/json')
			   .post(JSON.stringify({username: username})) (function(err, res, body){
    			 return callback(json(body))
    		 });
	},
  stand: function(username, callback) {
    robot.http(blackjack_url + "/dealer/stand")
         .header('Content-Type', 'application/json')
         .post(JSON.stringify({username: username})) (function(err, res, body){
			 console.log(body);
           return callback(json(body))
         });
  },
  hand: function(username, callback) {
    robot.http(blackjack_url + "/dealer/hand")
         .header('Content-Type', 'application/json')
         .post(JSON.stringify({username: username})) (function(err, res, body){
           return callback(json(body))
         });
  }
};

var users = [];

// creates a json out of a json string
function json(obj) {
	return JSON.parse(obj)
}
// pretty cards
function prettyCard(card) {
	return card.suit + ' ' + card.rank
}
function showHand(robot, msg) {
 	//msg.send("Your current hand: ");
	robot.messageRoom(msg.message.user.name, "Your current hand");
	BJAPI.hand(msg.message.user.name.toLowerCase(), function(hand) {
      for (var i = 0; i < hand.length; i++) {
        //msg.send(prettyCard(hand[i]));
		robot.messageRoom(msg.message.user.name, prettyCard(hand[i]));
      }
    });
	// TODO: Calculate and show total
}

function EndGame(robot, msg){
	for(var i = 0; i < users.length; i++){
		//Stop any active timers
		clearTimeout(users[i].timeoutId);

		//Tell users game is over
		//msg.send("Game over");
		robot.messageRoom(msg.message.user.name, "Game over");
	}
	
	//TODO: Compare totals, determine winner
	
	
	//clear users
	users = [];
	console.log("Game ended");
}

module.exports = function(robot) {
	robot.respond(/deal/i, function(msg) {
		//Start game if first player
		var shuffle;
		if(users == 0){
			shuffle = true;
			//BJAPI.deal(robot.name, shuffle, function(cards){
				//show one card from dealer hand
			//});
		}
		else{
			shuffle = false;
		}

=======
var users = [];

module.exports = function(robot) {
	robot.respond(/deal/i, function(msg) {
>>>>>>> 9cc775ae4668c5a09da430024f625f0cbad871f7
		var user = {};

		//Check for new user
		var newUser = true;
		for(var i = 0; i < users.length; i++){
<<<<<<< HEAD
			if(users[i].name == msg.message.user.name.toLowerCase()){
				newUser = false;
				msg.send('You have already been dealt cards this round!');
			}
		}
		if(newUser){
			var username = msg.message.user.name.toLowerCase();
			user.name = username;
			user.canHit = true;
			
			BJAPI.deal(username, shuffle, function(cards){
				user.hand = cards;
				showHand(robot, msg);
			});
			
			//Start 60 second timer to automatically stand player if they go inactive
			user.timeoutId = setTimeout(function(){
				user.canHit = false;
				//msg.send("Automatically Standing due to inactivity");
				robot.messageRoom(msg.message.user.name, "Automatically Standing due to inactivity");
				BJAPI.stand(username, function(score) {
					//msg.send("Your hand total this round is: ");
					//msg.send(score.user_message);
					robot.messageRoom(msg.message.user.name, "Your hand total this round is: ");
					robot.messageRoom(msg.message.user.name, score.user_message);
					if(score.message == "Everyone is standing!!!"){
						EndGame(robot, msg);
					}
				});
			}, 60000);
			users.push(user);

			msg.send('Good luck, ' + username);
		}
	});

  robot.respond(/hit/i, function(msg) {
		var username = msg.message.user.name.toLowerCase();

		//check if player is in game and status == canHit
		var ingame = false;
		var canHit = false;
		var id;
		for(var i = 0; i < users.length; i++){
			if(users[i].name == username){
				ingame = true;
				canHit = users[i].canHit;
				id = i;
			}
		}
		if(ingame){
			if(canHit){
				//reset idle timer
				clearTimeout(users[id].timeoutId);
				users[id].timeoutId = setTimeout(function(){ 
					users[id].canHit = false;
					//msg.send("Automatically Standing due to inactivity");
					robot.messageRoom(msg.message.user.name, "Automatically Standing due to inactivity");
					BJAPI.stand(username, function(score) {
						//msg.send("Your hand total this round is: ");
						//msg.send(score.user_message);
						robot.messageRoom(msg.message.user.name, "Your hand total this round is: ");
						robot.messageRoom(msg.message.user.name, score.user_message);
						if(score.message == "Everyone is standing!!!"){
							EndGame(robot, msg);
						}
					});
				}, 60000);

				//deal 1 card, show hand
				BJAPI.hit(users[id].name, function(card){
					console.log(card)
					users[id].hand = card;
					showHand(robot, msg)
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
		var username = msg.message.user.name.toLowerCase();

		//check if player is in game and status == canHit
		var ingame = false;
		var canHit = false;
		var id;
		for(var i = 0; i < users.length; i++){
			if(users[i].name == username){
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
				BJAPI.stand(username, function(score) {
					//msg.send("Your hand total this round is: ");
					//msg.send(score.user_message);
					robot.messageRoom(msg.message.user.name, "Your hand total this round is: ");
					robot.messageRoom(msg.message.user.name, score.user_message);
					if(score.message == "Everyone is standing!!!"){
						EndGame(robot, msg);
					}
				});
			}
			else{
				msg.send("You are already standing");
			}
		}
		else{
			msg.send('You are not in the game yet.  Type "bot deal" to get your cards');
		}
    });
			if(users[i] == user){
				newUser = false;
				msg.send('You are already playing!');
			}
		}
		if(newUser){
			user.name = msg.message.user.name.toLowerCase();
			user.hand = Dealer.deal();
			user.action = "";
			users.push(user);
			msg.send('Good luck, ' + user.name);
			console.log(user.hand);
			
			//Show hand
			//msg.send("Your current hand: ");
			msg.messageRoom(msg.message.user.name, "Your current hand: ");
			for(var i = 0; i < user.hand.length; i++){
				//msg.send(user.hand[i].suit + ' ' + user.hand[i].rank);
				msg.messageRoom(msg.message.user.name, user.hand[i]);
			}
		}
	});
  robot.respond(/hand/i, function(msg) {
    
    msg.send('');
  });
}
