'use strict';

angular.module('projects').factory('Promise', [
	function() {


		var y = {
			'data1': 'yes',
			'data2': 'maybe',
			'data3': "no"
		};

		var defer = $q.defer;

		defer.promise
			.then(function(x){
				alert(x);
				return y.data1;
			})
			.error(function(z){
				alert(y);
				return z;
			});

		defer.resolve(y.data2);

		// Promise service logic
		// ...

		// Public API
		//return {
		//	someMethod: function() {
		//		return true;
		//	}
		//};
	}
]);