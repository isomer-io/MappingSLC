'use strict';

angular.module('core').directive('mainMenu', function() {
    return {
      restrict: 'E',
      templateUrl: '/modules/core/client/directives/views/main-menu.html',

      controller: function() {

      },

      link: function() {
        var sidebar = L.control.sidebar('sidebar', {
          closeButton: true,
          position: 'left'
        }).addTo(map);

      }

    };
});
