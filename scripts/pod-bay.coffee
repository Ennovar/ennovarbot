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
#   open the <doortype> doors, bot  - bot opens the doors
#	bot open the <doortype> doors - bot opens the doors
#
# Author:
#   RyFisher
#

	
module.exports = (robot) ->
  robot.hear /open the (.*) doors(?:,)? bot/i, (msg) ->
      doorType = msg.match[1]
      name = msg.message.user.name.toLowerCase()
      if doorType is "pod bay" || doorType is "podbay" || doorType is "pod-bay"
        msg.send "I'm afraid I can't let you do that, #{name}"
      else
        msg.send "Opening #{doorType} doors"
	
  robot.respond /open the (.*) doors/i, (msg) ->
      doorType = msg.match[1]
      name = msg.message.user.name.toLowerCase()
      if doorType is "pod bay" || doorType is "podbay" || doorType is "pod-bay"
        msg.send "I'm afraid I can't let you do that, #{name}"
      else
        msg.send "Opening #{doorType} doors"
