'use strict';

angular.module('core').service('ApiKeys', ['$http',
	function($http) {
		// ApiKeys service logic
		// ...
        this.getApiKeys = function(){
            return  $http.get('/api/v1/keys');
        };
        this.getTractData = function(){
            return  $http.get('api/v1/tractData');
        };
    }
]);
