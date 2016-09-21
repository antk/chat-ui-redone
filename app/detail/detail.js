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
    $scope.animateClass = 'animate-details';
    $scope.userId = parseInt($routeParams.uid, 10);
    var cid = parseInt($routeParams.id, 10);
    $scope.messages = [];
    $scope.newMessageText = "";

    $scope.insertMessage = function(msg) {
      var msgId = $scope.messages[$scope.messages.length-1].msg_id+1;
      msg = {"msg_id":msgId, "sender_id":$scope.userId, "text":$scope.newMessageText, "datetime":new Date().getTime(), "last":true};
      $scope.messages.push(msg);
      UserChatService.insertMessage(cid, msg);
      $scope.clearField(); // this is a function in the contenteditable directive
      $scope.focusField(); // this is also a function in the contenteditable directive
    };

    UserChatService.getChatById($scope.userId, cid).then(function(chat) {
      $scope.pageTitle = [];
      $scope.participants = chat.participants;

      for(var i=0; i<chat.messages.length; i++) {
        // look at the next message
        // if next message has the same sender_id as the current message, last is false        
        var msg = chat.messages[i];
        msg.last = true;
        var nextMsg = i+1 < chat.messages.length ? chat.messages[i+1] : null;
        if(nextMsg && nextMsg.sender_id === msg.sender_id) {
          msg.last = false;
        }

        // also provide participant names to each message
        for(var j=0; j<chat.participants.length; j++) {
          var aParticipant = chat.participants[j];
          if(msg.sender_id == aParticipant.id) {
            msg.senderFirst = aParticipant.firstName;
            msg.senderLast = aParticipant.lastName;
            if($scope.pageTitle.indexOf(aParticipant.firstName) < 0) {
              $scope.pageTitle.push(aParticipant.firstName); // set the title of the page
            }
          }
        }

        $scope.messages.push(msg);
      }

    });
  }
]);