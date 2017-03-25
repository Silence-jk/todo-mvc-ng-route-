(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var myApp=angular.module('app',['ngRoute','app.controllers.main']);
	myApp.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
		$locationProvider.hashPrefix('');
		$routeProvider
			.when('/:status?', {
				controller: 'MainController',
				templateUrl: 'main_tmp'
			})
			.otherwise({ redirectTo: '/' });

	}])
})(angular);
