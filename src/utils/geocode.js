//Geocoding service
//Address => Latitude/ Longitude => Weather

const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2lsbHN3aXRjaDY5IiwiYSI6ImNrOW54cGxiMjA2bXczbG1zOGN5MnVnYXgifQ.IYyii1fqtbtoazZ6Rq1beA&limit=1'

    request({ url , json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to lacation services', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode