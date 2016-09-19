'use-strict';

angular.module('chatApp')

.directive('setHeight', ['$window', '$timeout', function($window, $timeout) {
  return {
    link: function($scope, $element, $attrs) {
      angular.element(document).ready(function() {
        var header = document.getElementById('header');
        var footer = document.getElementById('footer');
        var headerHeight = header ? header.offsetHeight : 0;
        var footerHeight = footer ? footer.offsetHeight: 0;
        var windowHeight = $window.innerHeight;

        var h = $element.attr('data-v-type') == 'list' ? windowHeight - headerHeight : windowHeight - headerHeight - footerHeight;
        $element.css('height', h + 'px');          
      })      
    }
  }
}])