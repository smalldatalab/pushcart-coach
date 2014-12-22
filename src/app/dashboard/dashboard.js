(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', 'dataservice', '$q'];

  function DashboardController($scope, dataservice, $q) {

    activate();

    function activate() {
      var promises = [getUsers(), getUsersCount()];
//            Using a resolver on all routes or dataservice.ready in every controller
//            return dataservice.ready(promises).then(function(){
      return $q.all(promises).then(function() {
        console.log('Activated Dashboard View');
      });
    }

    function getUsersCount() {
      return dataservice.getUsersCount()
        .then(function(data) {
          $scope.membersCount = data;
          return $scope.membersCount;
        });
    }

    function getUsers() {
      return dataservice.getUsers()
        .then(function(data) {
          var members = []
          
          for (var i = 0; i < data.length; i++ ) {
            if (i % 4 === 0) members.push([]);
            members[members.length-1].push(data[i]);
          }

          $scope.members = members;
          return $scope.members;
        });
    }

  }

})();
