'use strict';

angular.module('map').service('MarkerDataService', ['$http',
    function($http) {
        // ApiKeys service logic
        // ...
        this.getMarkerData= function(){
            return  $http.get('/markerData');
        };
    }
]);