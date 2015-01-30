'use strict';

angular.module('map').service('MapboxApiKeys', ['$http',
	function($http) {
		// MapboxApiKeys service logic
		// ...
        this.getApi = function(){

            return  $http.get('/keys');
        };
	}

]);