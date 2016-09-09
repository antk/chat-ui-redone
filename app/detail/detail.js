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
    var uid = parseInt($routeParams.uid, 10);
    var cid = parseInt($routeParams.id, 10);
    UserChatService.getChatById(uid, cid).then(function(chat) {
      $scope.messages = chat.messages;
    });
  }
]);