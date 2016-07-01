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
    },
    hit: function() {
	    return this.deck.getCards(1)
    }
}

var users = [];

module.exports = function(robot) {
	robot.respond(/deal/i, function(msg) {
		var user = {};

		//Check for new user
		var newUser = true;
		for(var i = 0; i < users.length; i++){
			if(users[i] == user){
				newUser = false;
				msg.send('You have already been dealt cards this round!');
			}
		}
		if(newUser){
			user.name = msg.message.user.name.toLowerCase();
			user.hand = Dealer.deal();
			user.canHit = true;
			users.push(user);
			msg.send('Good luck, ' + user.name);
			console.log(user.hand);
			
			//Show hand
			msg.send("Your current hand: ");
			//robot.messageRoom(msg.message.user.name, "Your current hand: ");
			for(var i = 0; i < user.hand.length; i++){
				msg.send(user.hand[i].suit + ' ' + user.hand[i].rank);
				//robot.messageRoom(msg.message.user.name, user.hand[i].suit + ' ' + user.hand[i].rank);
			}
		}
	});
	
	
	
    robot.respond(/hit/i, function(msg) {
		//check if player is in game and status == canHit
		
		//deal 1 card, show hand
		
		//set canHit based on total
		//if busted, display BUSTED message
        msg.send('');
    });
	
	robot.respond(/stand/i, function(msg) {
		//check if player is in game and status == canHit
		
		//set canHit to false
        msg.send('');
    });
}
