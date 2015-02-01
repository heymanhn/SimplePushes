var colors = require('colors'),
		express = require('express'),
		weather = require('./weather');

var app = express();

app.get('/api/search', function(req, res) {
	var origin, destination;
	var outputForecasts = function(forecasts) {
		res.send({
			weather: forecasts
		});
	};
	console.log("GET /api/search request".blue);

	if (!req.query['origin'])
		return res.status(400).send('Missing origin information');
	if (!req.query['destination'])
		return res.status(400).send('Missing destination information');

	origin = {
		lat: req.query['origin'].split(',')[0],
		lng: req.query['origin'].split(',')[1]
	};
	destination = {
		lat: req.query['destination'].split(',')[0],
		lng: req.query['destination'].split(',')[1]
	};

	weather.getWeather(destination, outputForecasts);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s'.green, host, port);
});
