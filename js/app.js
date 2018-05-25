'use strict';	

angular.module('app', ['ngRoute','7minworkout', 'ngMaterial', 'ngMessages'])
.config(function($routeProvider, $locationProvider, $sceDelegateProvider){
	$routeProvider.when('/start', {
		templateUrl: 'partials/start.html'
	});
	$routeProvider.when('/workout', {
		templateUrl: 'partials/workout.html',
		controller: 'WorkoutController'
	});
	$routeProvider.when('/finish', {
		templateUrl: 'partials/finish.html'
	});
	$routeProvider.otherwise({
		redirectTo: '/start'
	});

	// $sceDelegateProvider.resourceUrlWhitelist([
	// 	// Allow same origin resource loads.
	// 	'self',
	// 	// Allow loading from our assets domain.  Notice the difference between * and **.
	// 	'http://*.youtube.com/**'
	// ]);

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
angular.module('7minworkout', []);