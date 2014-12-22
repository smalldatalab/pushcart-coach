(function() {
  'use strict';

  angular
    .module('app.swap')
    .controller('SwapController', SwapController);

  SwapController.$inject = ['dataservice', '$scope'];

  function SwapController(dataservice, $scope) {

    activate();

    function activate() {
      return setSwapScopes().then(function() {
        console.log('Activated Swap View');
      });
    }

    function setSwapScopes() {
      $scope.newSwap = {};
      $scope.createSwap = createSwap;

      dataservice.getSwapCategories()
        .then(function(data) {
          $scope.swapCategories = data;
          return $scope.swapCategories;
        }
      );

      return dataservice.getSwaps()
        .then(function(data) {
          $scope.swaps = data;
          return $scope.swaps;
        }
      );
    }

    function createSwap(newSwap) {
      dataservice.createSwap(newSwap)
        .then(function(data) {
          $scope.swaps.push(data);
          return $scope.newSwap = {};
        }
      );
    };

  }
})();
