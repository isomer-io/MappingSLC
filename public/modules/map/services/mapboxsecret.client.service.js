'use strict';

angular.module('map').service('Mapboxsecret', ['$http',
	function($http) {
		// Mapboxsecret service logic
		// ...
        this.getApi = function(){

            return  $http.get('/keys');
        };
	}

]);