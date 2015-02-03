var bart = require('./bart'),
		colors = require('colors'),
		express = require('express'),
		promise = require('promised-io/promise'),
		weather = require('./weather');

var app = express();

app.get('/api/search', function(req, res) {
	var origin, destination;

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

	var weatherPromise = weather.getWeather(destination);
	var bartPromise = bart.getBART(origin);
	var completedPromise = promise.all(weatherPromise, bartPromise);
	completedPromise.then(function(results) {
		debugger;
		res.send({
			weather: results[0],
			bart: results[1]
		});
	}, function(errors) {
		return res.status(400).send('Error: ' + errors);
	});
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s'.green, host, port);
});
