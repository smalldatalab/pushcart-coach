(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['Restangular', '$sessionStorage', '$q'];

  /* @ngInject */
  function dataservice(Restangular, $sessionStorage, $q) {
    var isPrimed = false;
    var primePromise;


    var service = {
      getUsers: getUsers,
      getUsersCount: getUsersCount,
      getUser: getUser,
      inviteUser: inviteUser,
      getItem: getItem,
      getSwapCategories: getSwapCategories,
      getSwaps: getSwaps,
      createSwap: createSwap,
      createSwapSuggestion: createSwapSuggestion,
      updateColorCode: updateColorCode,
      getSwapSuggestions: getSwapSuggestions,
      ready: ready
    };

    return service;

    // Users

    function getUsers() {
      configureRestangular();
      var users = Restangular.all('users').getList()
                    .then(function(users) {
                      return users;
                    })
                    .catch(function(message) {
                      console.log(message);
                    });

      return $q.when(users);
    }

    function getUsersCount() {
      var count = 0;

      return getUsers()
        .then(countUsers)
        .catch(function(message) {
          console.log(message);
        });

      function countUsers (data) {
        count = data.length;
        return $q.when(count);
      }
    }

    function getUser (userId) {
      configureRestangular();
      return Restangular.all('users').get(userId)
              .then(getUserPurchases)
              .catch(function(message) {
                console.log(message);
              });

      function getUserPurchases (data) {
        var user = data;

        Restangular.service('purchases', Restangular.one('users', user.id)).getList({show_items: true})
          .then(function(purchases) {
            user.purchases = purchases;
            return user;
          })
          .catch(function(message) {
            console.log(message);
          });

        return $q.when(user);
      }
    }

    function inviteUser (email) {
      configureRestangular();

      var invite = Restangular.all('memberships').customPOST({email: email}, 'invite')
                                                    .then(function(invite) {
                                                      return {message: invite[0], error: false};
                                                    })
                                                    .catch(function(message) {
                                                      return {message: message.data[0], error: true};
                                                    });

      return $q.when(invite);
    }

    // Items

    function getItem(userId, itemId) {
      configureRestangular();
      var item = Restangular.one('users', userId).one('items', itemId).get()
                  .then(function(item) {
                    return item;
                  })
                  .catch(function(message) {
                    console.log(message);
                  });

      return $q.when(item);
    }

    function updateColorCode(oldItem, colorCode) {
      configureRestangular();
      var item = Restangular.one('users', oldItem.user_id).one('items', oldItem.id)

      item.color_code = colorCode;

      item = item.put()
              .then(function(item) {
                return item;
              })
              .catch(function(message) {
                console.log(message);
              });

      return $q.when(item);
    }

    // Swaps

    function getSwaps() {
      configureRestangular();
      var swaps = Restangular.all('swaps').getList()
                    .then(function(swaps) {
                      return swaps;
                    })
                    .catch(function(message) {
                      console.log(message);
                    });

      return $q.when(swaps);
    }

    function createSwap(newSwap) {
      configureRestangular();
      var swap = Restangular.all('swaps').post(newSwap)
                    .then(function(swap) {
                      return swap;
                    })
                    .catch(function(message) {
                      console.log(message);
                    });

      return $q.when(swap);     
    }

    function getSwapCategories() {
      configureRestangular();
      var swapCategories = Restangular.all('swap_categories').getList()
                            .then(function(swapCategories) {
                              return swapCategories;
                            })
                            .catch(function(message) {
                              console.log(message);
                            });

      return $q.when(swapCategories);
    }

    function createSwapSuggestion(memberId, newSwapSuggestion) {
      configureRestangular();
      var swapSuggestion = Restangular.one('users', memberId).all('swap_suggestions').post(newSwapSuggestion)
                            .then(function(swapSuggestion) {
                              return swapSuggestion;
                            })
                            .catch(function(message) {
                              console.log(message);
                            });

      return $q.when(swapSuggestion);     
    }

    function getSwapSuggestions(memberId) {
      configureRestangular();
      var swapSuggestions = Restangular.one('users', memberId).getList('swap_suggestions')
                              .then(function(swapSuggestions) {
                                return swapSuggestions;
                              })
                              .catch(function(message) {
                                console.log(message);
                              });

      return $q.when(swapSuggestions);
    }

    // Configuration

    function configureRestangular() {
      if ($sessionStorage.token) {
        Restangular.setDefaultRequestParams({
          access_token: $sessionStorage.token.access_token
        });
      }
    }

    function prime() {
      // This function can only be called once.
      if (primePromise) {
        return primePromise;
      }

      primePromise = $q.when(true).then(success);
      return primePromise;

      function success() {
        isPrimed = true;
        console.log('Primed data');
      }
    }

    function ready(nextPromises) {
      var readyPromise = primePromise || prime();

      return readyPromise
        .then(function() { return $q.all(nextPromises); })
        .catch(console.log('"ready" function failed'));
    }

  }
})();