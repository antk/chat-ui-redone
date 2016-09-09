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
      console.log(chat.messages);
      $scope.participants = chat.participants;
      $scope.messages = [];
      // look at the next message
      // if next message has the same sender_id as the current message, last is false
      for(var i=0; i<chat.messages.length; i++) {
        var msg = chat.messages[i];
        msg.last = true;
        var nextMsg = i+1 < chat.messages.length ? chat.messages[i+1] : null;
        if(nextMsg && nextMsg.sender_id === msg.sender_id) {
          msg.last = false;
        }
        $scope.messages.push(msg);
      }

    });
  }
]);