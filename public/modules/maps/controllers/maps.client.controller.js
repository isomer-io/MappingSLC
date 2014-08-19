'use strict';

// Maps controller
angular.module('maps').controller('MapsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Maps',
	function($scope, $stateParams, $location, Authentication, Maps ) {
		$scope.authentication = Authentication;

		// Create new Map
		$scope.create = function() {
			// Create new Map object
			var map = new Maps ({
				name: this.name
			});

			// Redirect after save
			map.$save(function(response) {
				$location.path('maps/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Map
		$scope.remove = function( map ) {
			if ( map ) { map.$remove();

				for (var i in $scope.maps ) {
					if ($scope.maps [i] === map ) {
						$scope.maps.splice(i, 1);
					}
				}
			} else {
				$scope.map.$remove(function() {
					$location.path('maps');
				});
			}
		};

		// Update existing Map
		$scope.update = function() {
			var map = $scope.map ;

			map.$update(function() {
				$location.path('maps/' + map._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Maps
		$scope.find = function() {
			$scope.maps = Maps.query();
		};

		// Find existing Map
		$scope.findOne = function() {
			$scope.map = Maps.get({ 
				mapId: $stateParams.mapId
			});
		};
	}
]);