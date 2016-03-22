# Description:
#   Enovar meeting room reservation script
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot meeting help

module.exports = (robot) ->
  Display = undefined
  Insert = undefined
  Remove = undefined
  brain = undefined
  removeExpire = undefined
  validateDate = undefined
  validateTime = undefined
  brain = 'RTL'

  validateDate = (strDate) ->
    dateformatMDY = undefined
    dateformatNumber = undefined
    year = undefined
    dateformatMDY = /^((January|March|May|July|August|October|December)\s(0[1-9]|[1|2][0-9]|3[0|1]|[1-9])|(April|June|September|November)\s(0[1-9]|[1|2][0-9]|30|[1-9])|February\s(0[1-9]|1[0-9]|2[0-8]|[1-9])),\s[0-9]{4}/
    dateformatNumber = /^(((1[02]|0[13578]|[13578])\/(0[1-9]|[1|2][0-9]|3[0|1]|[1-9]))|((11|0[469]|[469])\/(0[1-9]|[1|2][0-9]|30|[1-9]))|(0?2\/(0[1-9]|1[0-9]|2[0-8]|[1-9])))\/([0-9]{4})$/
    year = strDate.substring(strDate.length - 4)
    if year % 4 == 0 and year % 100 != 0 or year % 400 == 0
      dateformatMDY = /^((January|March|May|July|August|October|December)\s(0[1-9]|[1|2][0-9]|3[0|1]|[1-9])|(April|June|September|November)\s(0[1-9]|[1|2][0-9]|30|[1-9])|February\s(0[1-9]|[1|2][0-9]|[1-9])),\s[0-9]{4}/
      dateformatNumber = /^(((1[02]|0[13578]|[13578])\/(0[1-9]|[1|2][0-9]|3[0|1]|[1-9]))|((11|0[469]|[469])\/(0[1-9]|[1|2][0-9]|30|[1-9]))|(0?2\/(0[1-9]|[1|2][0-9]|[1-9])))\/([0-9]{4})$/
    strDate.match(dateformatMDY) or strDate.match(dateformatNumber)

  validateTime = (strTime) ->
    timeformat = undefined
    timeformat = /^(1[0-9]|2[0-3]|0?[1-9]):[0-6][0-9]$|^((1[0-2]|(0?[1-9])):[0-5][0-9]\s[aApP][mM])$/
    strTime.match timeformat

  removeExpire = ->
    RList = undefined
    i = undefined
    item = undefined
    length = undefined
    RList = robot.brain.get(brain)
    if RList != null
      length = RList.length
      i = 0
      while i < length
        item = RList.shift()
        if new Date(item[1]) >= Date.now()
          RList.push item
        i++
    return

  Display = (i, res1) ->
    RList = undefined
    d = undefined
    d1 = undefined
    d2 = undefined
    j = undefined
    removeExpire()
    RList = robot.brain.get(brain)
    d = new Date(RList[i][0])
    res1.send ' Date: ' + (if d.getMonth() < 9 then '0' + (d.getMonth() + 1) else (d.getMonth() + 1)) + '/' + (if d.getDate() < 10 then '0' + d.getDate() else d.getDate()) + '/' + d.getFullYear() + ':'
    j = i
    while j < RList.length and new Date(RList[j][0]).getFullYear() == d.getFullYear() and new Date(RList[j][0]).getMonth() == d.getMonth() and new Date(RList[j][0]).getDate() == d.getDate()
      d1 = new Date(RList[j][0])
      d2 = new Date(RList[j][1])
      res1.send '  ' + (if d1.getHours() < 10 then '0' + d1.getHours() else d1.getHours()) + ':' + (if d1.getMinutes() < 10 then '0' + d1.getMinutes() else d1.getMinutes()) + ' - ' + (if d2.getHours() < 10 then '0' + d2.getHours() else d2.getHours()) + ':' + (if d2.getMinutes() < 10 then '0' + d2.getMinutes() else d2.getMinutes()) + '              ID: ' + RList[j][2] + '  by: ' + RList[j][3]
      j++
    j - 1

  Insert = (reserveDate, reserveStart, reserveEnd, id, res) ->
    `var i`
    i = undefined
    RList = undefined
    X = undefined
    date_e = undefined
    date_s = undefined
    i = undefined
    ic = undefined
    revUniqueId = undefined
    s_end = undefined
    s_start = undefined
    sch = undefined
    testCondition = undefined
    today = undefined
    vcode = undefined
    RList = robot.brain.get(brain)
    today = new Date
    if RList == null
      res.send 'New Storage is created'
      RList = []
      robot.brain.set brain, RList
    removeExpire()
    if validateDate(reserveDate) and validateTime(reserveStart) and validateTime(reserveEnd)
      date_s = new Date(Date.parse(reserveDate + ' ' + reserveStart))
      date_e = new Date(Date.parse(reserveDate + ' ' + reserveEnd))
      if date_s > date_e or date_s < today or date_e <= today
        res.send '\nDate or Time invalid (Time in the past or start end mismatch)'
      else
        revUniqueId = ''
        X = today.getFullYear() + '' + (if today.getMonth() < 9 then '0' + today.getMonth() + 1 else today.getMonth() + 1) + '' + (if today.getDate() < 10 then '0' + today.getDate() else today.getDate()) + '' + (if today.getHours() < 10 then '0' + today.getHours() else today.getHours()) + '' + (if today.getMinutes() < 10 then '0' + today.getMinutes() else today.getMinutes()) + '' + (if today.getSeconds() < 10 then '0' + today.getSeconds() else today.getSeconds())
        vcode = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        i = X
        while 0 < i
          revUniqueId += vcode.charAt(i % 52) + ''
          i = Math.floor(i / 52)
        sch = new Array(4)
        sch[0] = date_s
        sch[1] = date_e
        if id == null
          sch[2] = revUniqueId.split('').reverse().join('')
        else
          sch[2] = id
        sch[3] = res.message.user.name
        testCondition = true
        i = 0
        while i < RList.length
          s_start = new Date(RList[i][0])
          s_end = new Date(RList[i][1])
          if date_s >= s_start and date_e <= s_end or date_e >= s_start and date_e <= s_end or date_s <= s_end and date_s >= s_start
            testCondition = false
            i = RList.length
          i++
        if testCondition == true
          RList.push sch
          ic = RList.length - 1
          while ic > 0 and new Date(RList[ic - 1][0]) > date_s
            RList[ic] = RList[ic - 1]
            ic--
          RList[ic] = sch
          return sch
        else
          res.send ' Time Conflict'
          return null
    else
      if !validateDate(reserveDate)
        res.send 'Date format or value is incorect'
      if !validateTime(reserveStart)
        res.send 'Time start is incorect'
      if !validateTime(reserveEnd)
        res.send 'Time End is incorect'
      return null
    return

  Remove = (id, user) ->
    RList = undefined
    i = undefined
    item = undefined
    length = undefined
    retval = undefined
    RList = robot.brain.get(brain)
    length = RList.length
    retval = undefined
    i = 0
    while i < length
      item = RList.shift()
      if !(item[2] == id and item[3] == user)
        RList.push item
      else
        retval = item
      i++
    retval

  robot.respond /meeting reserve (.+) from (.+) until (.+)$/i, (res) ->
    x = undefined
    x = Insert(res.match[1].trim(), res.match[2].trim(), res.match[3].trim(), null, res)
    if x != null
      res.send ''
      res.send ' Room is reserve. Resevation Id :' + x[2]
    return
  robot.respond /meeting remove (.+)/, (res) ->
    if Remove(res.match[1].trim(), res.message.user.name) != null
      res.send res.match[1].trim() + ' is removed'
    return
  robot.respond /meeting change (.+) for (.+)/, (res) ->
    d = undefined
    key = undefined
    list = undefined
    ndate = undefined
    nend = undefined
    newData = undefined
    nstart = undefined
    odate = undefined
    oend = undefined
    oldData = undefined
    ostart = undefined
    s_start = undefined
    value = undefined
    oldData = Remove(res.match[1].trim(), res.message.user.name)
    if oldData != null
      d = new Date(oldData[0])
      odate = (if d.getMonth() < 9 then '0' + (d.getMonth() + 1) else (d.getMonth() + 1)) + '/' + (if d.getDate() < 10 then '0' + d.getDate() else d.getDate()) + '/' + d.getFullYear() + ''
      ostart = (if d.getHours() < 10 then '0' + d.getHours() else d.getHours()) + ':' + (if d.getMinutes() < 10 then '0' + d.getMinutes() else d.getMinutes())
      d = new Date(oldData[1])
      oend = (if d.getHours() < 10 then '0' + d.getHours() else d.getHours()) + ':' + (if d.getMinutes() < 10 then '0' + d.getMinutes() else d.getMinutes())
      ndate = odate
      nstart = ostart
      nend = oend
      s_start = new Date(oldData[0])
      newData = oldData
      list = res.match[2].trim().split(' ')
      while list.length >= 2
        key = list.shift().trim()
        doit = true
        value = ''
        while list.length >= 1 and doit == true
          v1 = list.shift().trim()
          if v1 == 'date' or v1 == 'startTime' or v1 == 'endTime'
            doit = false
            list.unshift v1
          else if value.length == 0
            value = v1
          else
            value += ' ' + v1
        switch key
          when 'date'
            if validateDate(value)
              ndate = value
          when 'startTime'
            if validateTime(value)
              nstart = value
          when 'endTime'
            if validateTime(value)
              nend = value
      if Insert(ndate, nstart, nend, res.match[1].trim(), res) == null
        Insert odate, ostart, oend, res.match[1].trim(), res
      else
        res.send ''
        res.send ' Room is change. Resevation Id :' + res.match[1].trim()
    else
      res.send 'No listing found. Modification aborted.'
    return
  robot.respond /meeting (.+)/, (res) ->
    RList = undefined
    command = undefined
    d = undefined
    dday = undefined
    firstCom = undefined
    i = undefined
    removeExpire()
    RList = robot.brain.get(brain)
    res.send ''
    dday = undefined
    command = res.match[1].trim().split(' ')
    firstCom = command.shift()
    switch firstCom
      when 'today'
        dday = new Date
        i = 0
        while i < RList.length
          d = new Date(RList[i][0])
          if d.getFullYear() == dday.getFullYear() and d.getMonth() == dday.getMonth() and d.getDate() == dday.getDate()
            i = Display(i, res)
          i++
      when 'tomorow'
        dday = new Date
        dday.setDate dday.getDate() + 1
        i = 0
        while i < RList.length
          d = new Date(RList[i][0])
          if d.getFullYear() == dday.getFullYear() and d.getMonth() == dday.getMonth() and d.getDate() == dday.getDate()
            i = Display(i, res)
          i++
      when 'date'
        command = command.join(' ').trim()
        if validateDate(command)
          dday = new Date(Date.parse(command))
          i = 0
          while i < RList.length
            d = new Date(RList[i][0])
            if d.getFullYear() == dday.getFullYear() and d.getMonth() == dday.getMonth() and d.getDate() == dday.getDate()
              i = Display(i, res)
            i++
      when 'list'
        i = 0
        while i < RList.length
          i = Display(i, res)
          i++
    return
  robot.respond /meeting help/, (res) ->
    string = ''
    string += 'A reservation meeting room program\n'
    string += '\n'
    string += 'A reservation meeting room program has the following functions:\n'
    string += '- New room reservation\n'
    string += '- Changing existing room reservation\n'
    string += '- Delete an existing reservation\n'
    string += '- Listing meeting(s) in the system\n'
    string += '\n'
    string += 'Note: <date> can be entered in any of the following format\n'
    string += '              mm/dd/yyyy    (04/01/2016)\n'
    string += '              m/d/yyyy      (4/1/2016)\n'
    string += '              MMMM d, yyyy  (April 1, 2016) \n'
    string += '\n'
    string += '   <time> can be entered in 12 hour (1:00 pm) or 24 hour format (13:00)\n'
    string += '\n'
    string += '1. New room reservation\n'
    string += '   To create a new reservation, enter the date, reservation starting time and reservation ending time in the following format. \n'
    string += '\n'
    string += '    bot meeting reserve <date> from <time_start> until <time_end>\n'
    string += '\n'
    string += '   Example:\n'
    string += '\n'
    string += '    bot meeting reserve 04/01/2016 from 1:00 pm until 3:00 pm\n'
    string += '    bot meeting reserve April 1, 2016 from 13:00 until 15:00\n'
    string += '\n'
    string += '2. Changing existing room reservation\n'
    string += '   A Reservation <id> is needed to change an existing reservation.\n'
    string += '\n'
    string += '   -  To change reservation date only and keep start and end reservation time\n'
    string += '    bot meeting change <id> for date <date>\n'
    string += '\n'
    string += '   Example:\n'
    string += '      bot meeting change 3e53973Qe for date 4/1/2016\n'
    string += '\n'
    string += '   -  To change reservation start time and/or end time\n'
    string += '    bot meeting change <id> for startTime <time>\n'
    string += '          or\n'
    string += '    bot meeting change <id> for endTime <time>\n'
    string += '          or\n'
    string += '    bot meeting change <id> for startTime <time> endTime <time>\n'
    string += '\n'
    string += '   Example:\n'
    string += '    bot meeting change 3e53973Qe for startTime 2:00 pm\n'
    string += '\n'
    string += '   -  To change all information in the reservation\n'
    string += '    bot meeting change <id> for date <date> startTime <time> endTime <time>\n'
    string += '\n'
    string += '   Example:\n'
    string += '    bot meeting change 3e53973e for date 04/15/2016 startTime 2:00 endTime 3:59\n'
    string += '\n'
    string += '3. Delete an existing reservation\n'
    string += '   A Reservation <id> is needed to change an existing reservation. \n'
    string += '   Delete reservation in the following format.\n'
    string += '\n'
    string += '    bot meeting remove <id>\n'
    string += '\n'
    string += '   Example:\n'
    string += '    bot meeting remove 3e53973Qe\n'
    string += '\n'
    string += '4. Listing meeting(s) in the system\n'
    string += '   In order to list meetings in the system, user can choose from today, tomorrow, a specific date or just list all meetings. \n'
    string += '   A command can be given in the following format.\n'
    string += '\n'
    string += '    bot meeting <choice>\n'
    string += '\n'
    string += '   -  To list meeting for today or tomorrow\n'
    string += '    bot meeting today \n'
    string += '    bot meeting tomorrow\n'
    string += '\n'
    string += '   -  To list meeting for a specific date\n'
    string += '      bot meeting date <date>\n'
    string += '\n'
    string += '   Example:\n'
    string += '      bot meeting date 04/01/2016\n'
    string += '\n'
    string += '   -  To list all meetings\n'
    string += '      bot meeting list\n'
    res.send string
    return
  robot.respond /meeting reset/, (res) ->
    RList = undefined
    RList = []
    robot.brain.set brain, RList
    res.send 'Meetingroom data is erase'
    return
  return
