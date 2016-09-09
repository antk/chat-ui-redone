'use strict';

angular.module('chatApp')

.factory('UserChatService', ['$q', 'DataService', 
  function($q, DataService) {
    var data = {user:{}, chats:[]};

    var getUserData = function(uid) {
      var deferred = $q.defer();
      if(!data.user.id) {
        console.log('no data yet, get it');
        DataService.getChats().then(function(chatData) {
          DataService.getUsers().then(function(userData) {
            for(var userId in userData) {
              if(parseInt(userId,10) === uid) {
                var aUser = userData[userId];
                aUser.id = userId;
                data.user = aUser;
              }
            }
            for(var chatId in chatData) {
              var aChat = chatData[chatId];
              if(aChat.participants.indexOf(uid) >= 0) {
                aChat.chatId = chatId;
                data.chats.push(aChat);
              }
            }
          });
          deferred.resolve(data);
        });
      }
      else {
        console.log('this service has data, send that instead');

      }
    };

    return {
      getUserData: getUserData
    };
  }
]);