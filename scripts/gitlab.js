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
  robot.router.post("/gitlab/project/backend", function(req, re) {
    var teamlead  = "austin";
    console.log(req.body)
    var author = req.body.user_name;
    var project_name = req.body.project.name;
    var url_diff = req.body.commits[req.body.commits.length - 1].url
    var message = "New Commit in " + project_name + " by " + author + " commit diff " + url_diff;

    console.log(message)
    robot.messageRoom(teamlead, message);
    res.send('OK');
  });
  robot.router.post("/gitlab/project/frontend", function(req, re) {
    var teamlead  = "jerekshoe";
    var output = req.body.output;
    robot.messageRoom(teamlead, output);
    res.send('OK');
  });
  robot.router.post("/gitlab/project/mobile", function(req, re) {
    var teamlead  = "aymana";
    var output = req.body.output;
    robot.messageRoom(teamlead, output);
    res.send('OK');
  });
}
