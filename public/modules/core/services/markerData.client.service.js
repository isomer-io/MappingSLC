'use strict';

angular.module('core').service('MarkerDataService', ['$http',
    function($http) {
        // ApiKeys service logic
        // ...
        this.getMarkerData= function(){
            return  $http.get('/markerData');
        };
    }
]);