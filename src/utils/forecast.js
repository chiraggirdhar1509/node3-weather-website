const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/41c4317e785f3e4506706513543a7514/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    request({ url, json: true }, (error, { body}) => {
        // console.log(response.body.currently);

        if (error) {
            callback('unable to connect to weather server', undefined);
        } else if (body.error) {
            callback('unable to find location', undefined);
        } else {
            const { summary } = body.daily.data[0];
            const {precipProbability,temperature} = body.currently;
            callback(undefined, summary + 'Temperature sumary :The temperature is '+ temperature + ' there are ' + precipProbability + '% chance of rain')
        }
    });
};

module.exports = forecast;