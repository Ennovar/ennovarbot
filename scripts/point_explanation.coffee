# Description:
#  When user types bot explain points to @xxxx display an explanation image
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   bot explain points to <@nameofexplainee>
#
# Author:
#   osamarao
#




module.exports = (robot) ->

  robot.respond /explain points to (.*)/i, (res) ->
    name = res.match[1]
    res.send "#{name}: https://cldup.com/gf-BpR6uhu.jpg "
