https = require 'https'

forecastIOUrlWithLocation = 'https://api.forecast.io/forecast/5b45bab9d3b084277da4789f43ffcaa3/37.6889,-97.3361/?exclude=daily,minutely,hourly,flags'

# options =
#   hostname: 'api.forecast.io'
#   port: 80
#   path: '/forecast/5b45bab9d3b084277da4789f43ffcaa3/37.6889,-97.3361'

module.exports = (robot) ->

  robot.hear /weather/i, (res) ->
      forecast = "\nSummary: {summary}\nCurrent temperature: {temperature} F, but feels like: {apparentTemperature} F\nWind speed: {windspeed} mph\n"


      https.get(forecastIOUrlWithLocation, (someresponse) -> someresponse.on('data', (theWeather) ->


                              forecast = forecast.replace("{summary}", JSON.parse(theWeather).currently.summary)
                              forecast = forecast.replace("{temperature}", JSON.parse(theWeather).currently.temperature)
                              forecast = forecast.replace("{apparentTemperature}", JSON.parse(theWeather).currently.apparentTemperature)
                              forecast = forecast.replace("{windspeed}", JSON.parse(theWeather).currently.windSpeed)
                              res.send  forecast
                    ))
