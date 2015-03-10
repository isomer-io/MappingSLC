'use strict';

angular.module('map').service('ApiKeys', ['$http',
	function($http) {
		// ApiKeys service logic
		// ...
        this.getApiKeys = function(){
            console.log('get keys: ', $http.get('/keys'));
            return  $http.get('/keys');
        };
	}

]);