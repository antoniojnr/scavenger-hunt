angular
  .module('scavenger-hunt', ['ngMaterial', 'ngRoute', 'firebase'])
  .config(function($routeProvider) {
		$routeProvider
			.when('/login', {
				templateUrl : '../login.html'
			})
      .when('/home', {
				templateUrl : '../home.html'
			})
			.otherwise({
				redirectTo: '/home'
		  });
	});
