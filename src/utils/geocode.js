const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiY2hpcmFnZ2lyZGhhcjE1IiwiYSI6ImNqdGxlaWZ4MDBrZXk0M3EzenJudGdzODYifQ.DiHTKOf3hShnjRWZTwj_9w';

    request({ url: url, json: true }, (error, { body }) => {
        if( error) {
                callback('unable to connect to geolocation server', undefined);
        } else if( body.features.length === 0) {
               callback('please enter other location', undefined);
        } else {
            callback(undefined, {
                longitute: body.features[0].center[0],
                latitute: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
});
};

module.exports = geocode;

