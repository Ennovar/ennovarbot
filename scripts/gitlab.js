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

module.exports = function(robot) {
  robot.router.post("/gitlab/project", function(req, res) {
    var channel = req.body.channel;
    var output = req.body.output;
    robot.messageRoom(channel, output);
    res.send('OK')
  });
  robot.router.post("gitlab/project/backend", function(req, re) {
    var austin = "U0LMXRW0P";
    var output = req.body.output;
    robot.messageRoom(austin, output);
    res.send('OK');
  });
}
