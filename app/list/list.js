'use strict';

angular.module('chatApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list/:id', {
    templateUrl: 'list/list.html',
    controller: 'ListCtrl'
  });
}])

.controller('ListCtrl', ['$scope', '$routeParams', 'UserChatService', function($scope, $routeParams, UserChatService) {
  $scope.uid = parseInt($routeParams.id, 10);
  // console.log($scope.uid);
  if(!isNaN($scope.uid)) {
    UserChatService.getUserData($scope.uid).then(function(data) {
      console.log(data);
    });
  }
}]);