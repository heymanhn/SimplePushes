// weather.js - uses forecast.io API

var _ = require('underscore'),
		https = require('https'),
		API_KEY = '4c828d83449749a88110b377f01b6d5a';

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

module.exports.getWeather = function(location, cb) {
	var options = {
		host: 'api.forecast.io',
		method: 'GET',
		path: '/forecast/' + API_KEY + '/' + location.lat + ',' + location.lng
	};

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

