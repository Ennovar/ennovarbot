# Description:
#  When user types "Thanks bot" or any kind of Thanks mentioned in commands, then bot will respond randomly with "You're welcome" or 
#	"No problem" or "Don't mention it" or any number of you're-welcome-type responses
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot thanks | ty bot | tyvm bot | thnq bot  - Hubot accepts your thanks
#	thanks followed by any word - Hubot accepts your thanks
# Author:
#   Sindhusha
#

response = [
  "you're welcome",
  "no problem",
  "not at all",
  "don’t mention it",
  "it’s no bother",
  "it’s my pleasure",
  "my pleasure",
  "it’s all right",
  "it’s nothing",
  "think nothing of it",
  "sure",
  "sure thing"
]
 
	
module.exports = (robot) ->
	robot.respond /Thanks bot|thank you bot|ty bot|ty|tyvm bot|thnq bot|thnq|(thank).*/i, (msg) ->
    msg.send msg.random response