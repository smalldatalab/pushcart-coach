(function() {
  'use strict';

  angular.module('app.core', [
    /*
     * Angular modules
     */
    'ngStorage',

    /*
     * 3rd Party modules
     */
    'angular.filter',
    'oauth',
    'restangular',
    'ui.router',
    'ui.utils'

    /*
     * Our reusable cross app code modules
     */
  ]);
})();
