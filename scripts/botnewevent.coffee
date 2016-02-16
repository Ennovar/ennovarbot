# Description:
#   hubot displays the user generated ennovar events and dev ICT events using "bot events"
#   hubot displays the newly added events using "bot new event "
#
# Dependencies:
#   none
#
# Configuration:
#   none
#
# Commands:
#   bot new event, bot events,
#
# Author:
#   manish12, raghu25


class Tasks
  constructor: (@robot) ->
    @cache = []
    @robot.brain.on 'loaded', =>
      if @robot.brain.data.tasks
        @cache = @robot.brain.data.tasks

  add: (taskString) ->
    task = {task: taskString}
    @cache.push task
    @robot.brain.data.tasks = @cache
    task
  all: -> @cache

module.exports = (robot) ->
  tasks = new Tasks robot
# Adding new Ennovar events
  robot.respond /(bot new event) (.+?)$/i, (msg) ->
    task = tasks.add msg.match[2]
    msg.send "New Event added: #{task.task}"
# Displays all events
  robot.respond /(bot events)/i, (msg) ->
    if tasks.all().length > 0
      response = ""
      for task, num in tasks.all()
        response += "Ennovar event: #{task.task}\n"
      msg.send response
    else
      msg.send "There are no events"

# devict events
  robot.respond /bot events/i, (msg) ->
    url = 'http://api.meetup.com/2/events?status=upcoming&order=time&limited_events=False&group_urlname=devict&desc=false&offset=0&photo-host=public&format=json&page=20&fields=&sig_id=73273692&sig=9cdd3af6b5a26eb664fe5abab6e5cf7bfaaf090e'
    msg.http(url).get() (err, res, body) ->
      response = JSON.parse(body)
      devICT = ''
      response.results.forEach (event) ->
       devICT += 'Event in wichita:' + event.name + '\n' + 'Venue:' + event.venue.name + ' @ ' + event.venue.address_1 + '\n' + 'Date:'+ new Date(event.time) + '\n'
      msg.send devICT
