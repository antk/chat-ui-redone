'use strict';

// Declare app level module which depends on views, and components
angular.module('chatApp', [
  'ngRoute',
  'ngAnimate',
  'ngSanitize',
  'chatApp.list',
  'chatApp.detail'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/list'});
}]);
