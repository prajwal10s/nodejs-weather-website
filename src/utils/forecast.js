// //Weather api used => Weatherstack

const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9fe8d8369715d5bcc969ee033b9fc342&query='+ latitude +',' + longitude + '&units=m'
    
    request({ url, json: true},(error, {body}) => {
        if(error){
            callback('Unable to reach Weather Services', undefined)
        }
        else if(body.error || body.location.name === null){
            callback('Unable to find the location', undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] + "." + " It is currently " + body.current.temperature+ " degrees out there. " + "There is a "+ body.current.precip+ "% chance of rain. The humidity level is "+ body.current.humidity +"%." )
        }
        
    })

}

module.exports = forecast








