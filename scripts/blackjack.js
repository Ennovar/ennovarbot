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
}

// Card suits
var suits = ['♦️','♥️', '♣️', '♠️'];
// Card ranks 1-K
var ranks = ['A', 'K', 'Q', 'J', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
var cards = getCards(suits, ranks);
var Deck = {
  cards: cards,
  deal: function() {
    return this.cards[Math.floor(Math.random()*items.length)]
  }
}
