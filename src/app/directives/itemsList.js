(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('itemsList', itemsList);

  function itemsList () {
    var directive = {
                      templateUrl: 'app/directives/itemsList.html',
                      restrict: 'E',
                      scope: {
                        itemslist: '=',
                        member: '='
                      }
                    }

    return directive;
  }
})();
