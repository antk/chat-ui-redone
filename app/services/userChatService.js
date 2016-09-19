'use strict';

angular.module('chatApp')

.factory('UserChatService', ['$q', 'DataService', 
  function($q, DataService) {
    var data = {user:{}, chats:{}};

    var getUserData = function(uid) {
      var deferred = $q.defer();
      if(!data.user.id) {
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
              var foundIdx = aChat.participants.indexOf(uid);
              if(foundIdx >= 0) { // found a chat where the user is a participant
                aChat.chat_id = chatId;
                aChat.participants.splice(foundIdx, 1); // remove the user in the participants array, already established
                var pArr = [];
                for(var i=0; i<aChat.participants.length; i++) { // replace user id with user objects
                  var pObj = userData[aChat.participants[i]];
                  pObj.id = aChat.participants[i];
                  pArr.push(pObj); 
                }
                aChat.participants = pArr;
                data.chats[chatId] = aChat;
              }
            }
            deferred.resolve(data);
          });
        });
      }
      else {
        deferred.resolve(data);
      }
      return deferred.promise;
    }

    var getChatById = function(uid, cid) {
      return getUserData(uid).then(function(userData) {
        return userData.chats[cid];
      });
    };

    var addMessage = function(cid, msg) {

    };

    return {
      getUserData: getUserData,
      getChatById: getChatById
    };
  }
]);