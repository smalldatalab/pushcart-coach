(function() {
  'use strict';

  angular
    .module('app.member')
    .controller('MemberController', MemberController);

  MemberController.$inject = ['dataservice', '$stateParams', '$scope'];

  function MemberController(dataservice, $stateParams, $scope) {

    $scope.swapSuggestions = []; // Turns off the "events" in the timeline, which was broken anyway

    activate($stateParams.memberId);

    function activate(memberId) {

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

  }
})();
