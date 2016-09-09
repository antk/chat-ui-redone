'use strict';

angular.module('chatApp.detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/detail/:uid/:id', {
    templateUrl: 'detail/detail.html',
    controller: 'DetailCtrl'
  });
}])

.controller('DetailCtrl', ['$scope', '$routeParams', 'UserChatService',
  function($scope, $routeParams, UserChatService) {
    $scope.userId = parseInt($routeParams.uid, 10);
    var cid = parseInt($routeParams.id, 10);
    UserChatService.getChatById($scope.userId, cid).then(function(chat) {
      $scope.participants = chat.participants;
      $scope.messages = chat.messages;
    });
  }
]);