const request = require('request');

const geocodeAddress = (address, callback) => {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
		address
    )}&key=AIzaSyACFXoB-5SSWzVIcDK3RXomDBcuDYjgWYQ`;
	request(
		{
			url,
			json: true,
		},
		(error, response, body) => {
			if (error) {
				callback('error occured');
			} else if (body.status === 'ZERO_RESULTS') {
				callback('Unable to find location.');
			} else if (body.status === 'OK') {
				const { results } = body;
				callback(undefined, {
					location: results[0].formatted_address,
					latitude: results[0].geometry.location.lat,
					longitude: results[0].geometry.location.lng,
				});
			}
		}
	);
}

module.exports = geocodeAddress;
