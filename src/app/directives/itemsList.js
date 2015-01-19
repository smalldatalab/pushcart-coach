(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('itemsList', itemsList);

  function itemsList (dataservice) {
    var directive = {
                      templateUrl: 'app/directives/itemsList.html',
                      restrict: 'E',
                      scope: {
                        itemslist: '=',
                        member: '='
                      },
                      link: function($scope, element, attrs) {
                        $scope.updateColorCode = function updateColorCode(item, colorCode, index) {
                          dataservice.updateColorCode(item, colorCode)
                            .then(function(data) {
                              $scope.itemslist[index] = data;
                              return item;
                            }
                          );
                        }
                      }
                    }

    return directive;
  }
})();
