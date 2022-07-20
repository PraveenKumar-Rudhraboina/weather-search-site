const request = require('request')

const forecast = (latitude, longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=cd89b3c2905dcf820aeeb61eb42d104f&query=' + latitude +','+longitude+'&units=f'
        request({url, json: true}, (error, {body}={})=>{

            if(error){
                callback('unable to connect to location services', undefined)
            } else if (body.error){
                callback("Unable to find Location!!", undefined)
            } else{
            //     callback({
            //         temparature: body.current.temperature,
            //         rainchance:  body.current.precip,
            //         weather_descriptions: body.current.weather_descriptions[0]
            // },'undefined')
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out. There is a '+ body.current.precip
            + '% chance of rain.')
        }

        })
}



module.exports = forecast