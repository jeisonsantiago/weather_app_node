const request = require('request')

const forecast = (latitude, longitude, callback) => {
    // const url = 'https://api.darksky.net/forecast/OubQAXnMdnWDtqMtKt7X8VtN7q77CTuw/' + latitude + ',' + longitude
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=542ffd081e67f4512b705f89d2a611b2`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=be55a41dece6b4a5c451dc2553dfe9d1`;
  
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log(body.error);
            callback('Unable to find location', undefined)
        } else {
            console.log(body);
            callback(undefined, body.weather[0].main + ', It is currently ' + body.main.temp + ' degress out.');
        }
    });
}

module.exports = forecast