(function() {
    'use strict';

    var block = angular.module('blocks.routes');

    block.config(routing);

    routing.$inject = ['$urlRouterProvider', '$stateProvider'];

    function routing ($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider.state('dashboard', {
        url: '/',
        controller: 'DashboardController',
        templateUrl: 'app/dashboard/dashboard.html'
      }).state('members', {
        url: '/members',
        controller: 'MemberController',
        templateUrl: 'app/member/member.html'
      }).state('member', {
        url: '/members/{memberId}',
        controller: 'MemberController',
        templateUrl: 'app/member/member.html'
      }).state('item', {
        params: { itemId: {}, memberId: {} },
        parent: 'member',
        controller: 'ItemController',
        templateUrl: 'app/item/show.html'
      }).state('swap', {
        url: '/swaps',
        controller: 'SwapController',
        templateUrl: 'app/swap/swap.html'
      });
    }

})();