'use-strict';

angular.module('chatApp')

.directive('contenteditable', ['$sce', function($sce) {
  return {
    restrict: 'A', 
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      if(!ngModel) return;

      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
      };

      element.on('blur keyup change', function() {
        scope.$evalAsync(read);
      });
      read();

      function read() {
        var html = element.html();
        if(attrs.stripBr && html === '<br>') {
          html = '';
        }
        ngModel.$setViewValue(html);
      }

      scope.clearField = function() {
        element.html("");
      }
    }
  }
}]);