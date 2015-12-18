var app = angular.module('app', [ 'ngRoute' ]).config(function ( $routeProvider ) {
  $routeProvider.when('/', {
      templateUrl: 'templates/home.html',
      controller: 'PageController'
    })
    .when('/vis', {
      templateUrl: 'templates/vis.html',
      controller: 'PageController'
    })
    .otherwise({ redirectTo: '/'});
});