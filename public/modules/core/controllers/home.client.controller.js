'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.toggle = true;
		//todo create a function that makes photo1 and 2 dynamic rather than hard-coded.
		$scope.photo1 = "as";
		$scope.photo2 = "dw";
	}
]);