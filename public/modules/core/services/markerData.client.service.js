'use strict';

angular.module('core').service('MarkerDataService', ['$http',
    function($http) {
        // Project Marker Data Service
        // ...
        this.getMarkerData = function(){
            return  $http.get('/markerData');
        };
    }
]);