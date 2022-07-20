
const request = require('request')

const geoCode = (adress, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoicHJhdmVlbmt1bWFyMTQ3OCIsImEiOiJjbDVzamF3M3owMDIwM2RyeHNrY2NpbTkwIn0.ToEhtVFjOAG-GevNbQYMXA' 
    request({url, json:true}, (error, {body}={})=>{
        if (error){
            callback('Unable to connect to Location Services!!!!', undefined)
        } else if (body.features.length === 0){
            callback("Unable to find Location Data!!. Try another search.", undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
            // console.log("latitude: "+response.body.features[0].center[1] + " longitude :" +response.body.features[0].center[0])
        }
    })

}

module.exports = geoCode
