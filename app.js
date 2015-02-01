var colors = require('colors'),
		express = require('express'),
		weather = require('./weather');

var app = express();

app.get('/api/search', function(req, res) {
	var outputForecasts = function(forecasts) {
		res.send({
			weather: forecasts
		});
	};

	console.log("GET /api/search request".blue);
	debugger;
	console.log(colors.blue("lat is: %s"), req.query['lat']);
	weather.getWeather(outputForecasts);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s'.green, host, port);
});
