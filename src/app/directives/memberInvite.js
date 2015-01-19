(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('memberInvite', memberInvite);

  function memberInvite (dataservice) {
    var directive = {
                      templateUrl: 'app/directives/memberInvite.html',
                      restrict: 'E',
                      link: function($scope, element, attrs) {
                        $scope.inviteEmail = null;
                        $scope.responseMessage = null;
                        $scope.inviteMember = function inviteMember() {
                          dataservice.inviteUser($scope.inviteEmail)
                            .then(function(data) {
                              $scope.inviteEmail = null;
                              $scope.responseMessage = data;
                            }
                          );
                        }
                      }
                    }

    return directive;
  }
})();
