(function() {
  'use strict';

  angular
    .module('app.item')
    .controller('ItemController', ItemController);

  ItemController.$inject = ['dataservice', '$scope', '$stateParams'];

  function ItemController(dataservice, $scope, $stateParams) {

    activate();

    function activate() {
      return setItemScopes().then(function() {
        console.log('Activated Item View');
      });
    }

    function setItemScopes() {
      $scope.swapId = null;
      $scope.createSwapSuggestion = createSwapSuggestion;

      dataservice.getSwaps()
        .then(function(data) {
          $scope.swaps = data;
          return $scope.swaps;
        }
      );

      return dataservice.getItem($stateParams.memberId, $stateParams.itemId)
        .then(function(data) {
          $scope.item = data;
          return $scope.item;
        }
      );
    }

    function createSwapSuggestion(swapId) {
      dataservice.createSwapSuggestion($stateParams.memberId, $scope.item, swapId)
        .then(function(data) {
          console.log(data);
          $scope.item = data;
          return $scope.item;
        }
      );
    };

  }
})();
