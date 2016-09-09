'use strict';

angular.module('chatApp')

.factory('DataService', ['$http',
  function($http) {
    var getData = function(url) {
      return $http.get(url)
        .then(function(response) {
          return response.data;
        }, function(errResponse) {
          throw errResponse.status + ': ' + errResponse.data;
      });
    };

    var getChats = function() {
      return getData('../data/chats.json');
    };

    var getUsers = function() {
      return getData('../data/users.json');
    };

    return {
      getChats: getChats,
      getUsers: getUsers
    };
  }
]);