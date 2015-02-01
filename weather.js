// weather.js - uses forecast.io API

var API_KEY = '4c828d83449749a88110b377f01b6d5a',
		LAT = '37.7833',
		LNG = '-122.4167',
		https = require('https');

var options = {
	host: 'api.forecast.io',
	method: 'GET',
	path: '/forecast/' + API_KEY + '/' + LAT + ',' + LNG
};

// Once the forecasts are extracted, call this function
var printForecasts = function() {
	console.log('Current weather is:');
	console.log(forecasts.currently);

	console.log('Hourly forecasts for next 12 hours:');
	console.log(forecasts.hourly);
};

var extractData = function(forecast) {
	return {
		time: new Date(forecast.time * 1000),
		summary: forecast.summary,
		icon: forecast.icon,
		precipitation: forecast.precipProbability,
		temperature: forecast.temperature,
		apparentTemperature: forecast.apparentTemperature,
		humidity: forecast.humidity
	};
};

module.exports.getWeather = function(cb) {
	var req = https.request(options, function(res) {
		var forecasts = {}, forecastJSON = "";
		res.setEncoding('utf8');

		res.on('data', function(chunk) {
			forecastJSON += chunk; 
		});

		res.on('end', function() {
			forecastJSON = JSON.parse(forecastJSON);

			if (forecastJSON.currently)
				forecasts.currently = extractData(forecastJSON.currently);

			if (forecastJSON.hourly) {
				var i, hourlyForecasts = [];
				for (i = 0; i < forecastJSON.hourly.data.length; i++) {
					hourlyForecasts[i] = extractData(forecastJSON.hourly.data[i]);

					if (hourlyForecasts.length === 12)
						break;
				}

				forecasts.hourly = hourlyForecasts;
			}

			return cb(forecasts);
		});
	});

	req.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});

	req.end();
};

