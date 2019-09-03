const request = require("request");

const getWeather = ({ latitude, longitude }, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/2deb42235c21fafd14d61df5748e2eec/${latitude},${longitude}?units=si`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { currently, daily } = body;
        callback(undefined, {
          temperature: currently.temperature,
          apprentTemperature: currently.apparentTemperature,
          summary: daily.summary
        });
      } else if (response.statusCode === 400) {
        callback("error occured");
      } else {
        callback("bad reuest");
      }
    }
  );
};

module.exports = getWeather;
