// bart.js - BART schedules for a given origin and destination

var _ = require('underscore'),
		Deferred = require('promised-io/promise').Deferred;

module.exports.getBART = function(location) {
	var deferred = new Deferred();

	// FILL IN
	console.log('test');

	deferred.resolve(location);
	return deferred.promise;
};