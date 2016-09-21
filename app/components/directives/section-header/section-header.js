'use strict';

angular.module('chatApp')

.directive('sectionHeader', function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: '/components/directives/section-header/section-header.html',
    link: function(scope, element, attrs) {
      scope.type = attrs.type;
      scope.title = attrs.title;
      scope.$watchGroup(['pageTitle'], function(newValue, oldValue) {
        if(newValue[0]) {
          scope.title = newValue[0].join(', ');
        }
      })
    }
  }
});