(function() {
  'use strict';

  angular
    .module('app.directives')
    .directive('weeklyPurchaseChart', weeklyPurchaseChart);

  function weeklyPurchaseChart () {
    var directive = {
                      restrict: 'E',
                      template: '<div></div>',
                      scope: { 
                                purchases: '=',
                                suggestions: '='
                              },
                      replace: true,
                      link: function($scope, element, attrs) {
                        $scope.$watchGroup(['purchases', 'suggestions'], function(newValues, oldValues, scope) {
                          if(newValues[0] && newValues[1]) {

                            var data, item, purchase, items, servings, tuple, _i, _j, _len, _len1, _ref, _ref1;

                            data = [];

                            _ref = scope.purchases;
                            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                              purchase = _ref[_i];

                              tuple = {
                                date: purchase.purchase_date,
                                dairy: 0,
                                vegetables: 0,
                                fruit: 0,
                                grain: 0,
                                protein: 0,
                                fat: 0,
                                uncategorized: 0
                              }

                              _ref1 = purchase.items;
                              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                                item = _ref1[_j];
                                // servings = item.nf_servings_per_container * item.quantity;
                                tuple[item.filtered_category] += (item.nutritional_data.servings_per_container * item.quantity);
                              }
                              
                              data.push(tuple);
                            }

                            var events = [];

                            for (var e = 0; e < scope.suggestions.length; e++) {
                              events.push(scope.suggestions[e].created_at);
                            }

                            Morris.Area({
                                          element: element,
                                          data: data,
                                          dateFormat: function (x) { return new Date(x).toString(); },
                                          xkey: 'date',
                                          ykeys: ['dairy', 'vegetables', 'fruit', 'grain', 'protein', 'fat', 'uncategorized'],
                                          labels: ['Dairy', 'Vegetables', 'Fruit', 'Grain', 'Protein', 'Fat', 'Uncategorized'],
                                          events: events,
                                          eventLineColors: ['#ee0c0c'],
                                          pointSize: 2,
                                          hideHover: 'auto',
                                          resize: false
                                        });
                          }
                        });
                      }
    };

    return directive;
  }
})();
