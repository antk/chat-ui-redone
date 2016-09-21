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
  $scope.animateClass = 'animate-list';
  if(!isNaN($scope.uid)) {
    UserChatService.getUserData($scope.uid).then(function(data) {
      var chatsArray = [];
      for(var chatId in data.chats) {
        var obj = {lastDateTime:0, chat:{}};
        obj.lastDateTime = data.chats[chatId].messages[data.chats[chatId].messages.length-1].datetime;
        obj.chat = data.chats[chatId];
        chatsArray.push(obj);
      }
      $scope.userChats = chatsArray;
    });
  }
}]);