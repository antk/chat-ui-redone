'use-strict';

angular.module('chatApp')

.directive('scrollBottom', ['$timeout', function($timeout) {
  return {
    scope: {
      scrollBottom: "="
    },
    link: function(scope, element, attrs) {
      
      scope.$watchCollection('scrollBottom', function(newValue) {
        if(newValue) {
          $timeout(function() {
            element[0].scrollTop = element[0].scrollHeight;
          }, 100);          
        }
      });
    }
  };
}]);