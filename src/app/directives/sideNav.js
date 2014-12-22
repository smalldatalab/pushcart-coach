(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('sideNav', sideNav);

  function sideNav () {
    var directive = {
                      templateUrl: 'app/directives/sideNav.html',
                      restrict: 'E',
                      scope: {
                        member: '='
                      },
                      link: function($scope, element, attrs) {
                        $scope.$watch('member', function(member) {
                          if (member) {
                          }
                        });
                      }
                    }

    return directive;
  }
})();
