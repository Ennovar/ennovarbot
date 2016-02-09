https = require 'https'

forecastIOUrlWithLocation = 'https://api.forecast.io/forecast/5b45bab9d3b084277da4789f43ffcaa3/37.6889,-97.3361/?exclude=daily,minutely,hourly,flags&units=si'

# options =
#   hostname: 'api.forecast.io'
#   port: 80
#   path: '/forecast/5b45bab9d3b084277da4789f43ffcaa3/37.6889,-97.3361'

module.exports = (robot) ->

  robot.hear /weather/i, (res) ->
      # responseVar
      # http.get({
      #   hostname: 'www.google.com'
      #   },
      #   (someresponse) -> responseVar someresponse.statuscode
      #   )
    myfavoriteString = "{ \"firstName\": \"John\", \"lastName\": \"Smith\", \"isAlive\": true, \"age\": 25 }";
    res.send "looking up weather now "
    https.get(forecastIOUrlWithLocation, (someresponse) -> someresponse.on('data', (theWeather) -> res.send JSON.parse(theWeather).currently.temperature))
