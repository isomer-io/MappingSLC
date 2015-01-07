//'use strict';
//
//angular.module('projects').directive('staticMap', ['$scope',
//	function($scope) {
//		return {
//			template: '<div></div>',
//			restrict: 'E',
//			link: function postLink(scope, element, attrs) {
//
//				//create static map from lat and long
//
//				$scope.mapImage =
//					'http://api.tiles.mapbox.com/v4/{' +
//					data.mapboxKey + '/' +
//					this.geocode.long + ',' +
//					this.geocode.lat +
//					',10/' + //set the map zoom: default '10'
//					width + 'x' + height + '.png?access_token=' +
//					data.mapboxSecret;
//
//				//{name}-{label}+{color}({lon},{lat})
//				//var width = '100%';
//				//var height = 'auto';
//
//				element.text('this is the staticMap directive');
//			}
//		};
//	}
//]);