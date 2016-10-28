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

// sleep time expects milliseconds
 function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}
module.exports = function(robot) {
	robot.respond(/bomb \w+/i, function(msg) {
    var message = msg.message.text.replace('bot bomb', '');
    for( var i = 0; i < 10; i++) {
        (function(i){
              setTimeout(function(){
                      msg.send("booooomb " + message);
                        }, 500 * i )
               })(i);
    }
  });
}
