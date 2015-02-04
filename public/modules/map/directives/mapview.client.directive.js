'use strict';

angular.module('map').directive('mapview', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Mapview directive logic
				// ...


			}
		};
	}
]);