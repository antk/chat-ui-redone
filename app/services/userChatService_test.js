'use strict'

describe('UserChatService.addMessage', function() {
  var UserChatService;

  beforeEach(module('chatApp'));

  beforeEach(function() {
    inject(function($q, $rootScope, DataService, _UserChatService_) {
      // because UserChatService has a dependency on DataService
      // need to include it here and use jasmine spyOn to fake the calls and return promises
      UserChatService = _UserChatService_;
      spyOn(DataService, "getChats").and.callFake(function(uid) {
        var deferred = $q.defer();
        var chatData = {
          "0":  {
            "participants":[0, 1], 
            "messages": [
              {"msg_id":0, "sender_id":0, "text":"i got da best webz", "datetime":1470927487072},
              {"msg_id":1, "sender_id":0, "text":"u must respect", "datetime":1470927547072},
              {"msg_id":2, "sender_id":1, "text":"go away", "datetime":1470927607072},
              {"msg_id":3, "sender_id":1, "text":"puny spider", "datetime":1470927667072}
            ]
          }
        };
        deferred.resolve(chatData);
        return deferred.promise;
      });
      spyOn(DataService, "getUsers").and.callFake(function() {
        var deferred = $q.defer();
        var userData = {
          "0": {"firstName":"Peter", "lastName":"Parker", "contacts":     [1,2,3,4,5,6,7,8,9,10,11]},
          "1": {"firstName":"Bruce", "lastName":"Banner", "contacts":     [0,2,3,4,5,6,7,8,9,10,11]}
        };
        deferred.resolve(userData);
        return deferred.promise;
      });
    });
  });
  it('should add a new message to an existing chat', inject(function($rootScope) {
    UserChatService.getUserData(0).then(function(data) {
      var oldLength = data.chats[0].messages.length;
      var msgId = data.chats[0].messages.length
      var testMsg = {"msg_id":msgId, "sender_id":1, "text":"puny spider", "datetime":""}
      UserChatService.insertMessage(data.chats[0].chat_id, testMsg); // finally get to test addMessage!
      expect(data.chats[0].messages.length).toEqual(oldLength+1);
    });
    $rootScope.$apply();
  }));
});