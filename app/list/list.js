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
      $scope.userChats = data.chats;
      var newChatsArray = [];
      for(var i=0; i<data.chats.length; i++) {
        var obj = {lastDateTime:0, chat:{}};
        obj.lastDateTime = data.chats[i].messages[data.chats[i].messages.length-1].datetime;
        obj.chat = data.chats[i];
        newChatsArray.push(obj);
      }
      $scope.userChats = newChatsArray;
      console.log($scope.userChats);
    });
  }
}]);