(function() {
  'use strict';

  angular
    .module('app.member')
    .controller('MemberController', MemberController);

  MemberController.$inject = ['dataservice', '$stateParams', '$scope'];

  function MemberController(dataservice, $stateParams, $scope) {

    activate($stateParams.memberId);

    function activate(memberId) {
      getSwapSuggestions(memberId);

      return getMember(memberId).then(function() {
        console.log('Activated Member View');
      });
    }

    function getMember(memberId) {
      return dataservice.getUser(memberId)
        .then(function(data) {
          $scope.member = data;
          return $scope.member;
        }
      );
    }

    function getSwapSuggestions(memberId) {
      return dataservice.getSwapSuggestions(memberId)
        .then(function(data) {
          $scope.swapSuggestions = data;
          return $scope.swapSuggestions;
        }
      );
    }

  }
})();
