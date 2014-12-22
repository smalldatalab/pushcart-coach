(function() {
    'use strict';

    var core = angular.module('app.core');

    var config = {
        appErrorPrefix: '[Nutritionist Dashboard Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Pushcart Nutritionist Dashboard',
        version: '0.2.0'
    };

    core.value('config', config);

    core.config(configure);

    /* @ngInject */
    function configure ($locationProvider, RestangularProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');

      // Restangular config
      RestangularProvider.setBaseUrl('http://sandbox.gopushcart.com/api/v1');
      RestangularProvider.setRequestSuffix('.json');
    }
})();
