(function() {
  'use strict';

  angular.module('pushcartCoach', [
    /*
     * Everybody has access to these.
     */ 
    'app.core',
    'blocks.routes',
    'app.directives',

    /*
     * Feature areas
     */
    'app.dashboard',
    'app.member',
    'app.swap',
    'app.item'
  ]);

})();