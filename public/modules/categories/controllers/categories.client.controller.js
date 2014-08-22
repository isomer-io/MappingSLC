'use strict';

// Categories controller
angular.module('categories').controller('CategoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Categories',
	function($scope, $stateParams, $location, Authentication, Categories ) {
		$scope.authentication = Authentication;

        // setup editor options
        $scope.editorOptions = {
            uiColor: '#000000'
        };

        $scope.readOnlyWYSIWYG = {
            uiColor: '#000000',
            readOnly: true
        }

        $scope.$on("ckeditor.ready", function( event ) {
            $scope.isReady = true;
        });

		// Create new Category
		$scope.create = function() {
			// Create new Category object
			var category = new Categories ({
				title: this.title,
                description: this.description,
                isActive: this.isActive
			});

			// Redirect after save
			category.$save(function(response) {
				$location.path('categories/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.title = '';
            this.description = '';
            this.isActive = '';
		};

		// Remove existing Category
		$scope.remove = function( category ) {
			if ( category ) { category.$remove();

				for (var i in $scope.categories ) {
					if ($scope.categories [i] === category ) {
						$scope.categories.splice(i, 1);
					}
				}
			} else {
				$scope.category.$remove(function() {
					$location.path('categories');
				});
			}
		};

		// Update existing Category
		$scope.update = function() {
			var category = $scope.category ;

			category.$update(function() {
				$location.path('categories/' + category._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Categories
		$scope.find = function() {
			$scope.categories = Categories.query();
		};

		// Find existing Category
		$scope.findOne = function() {
			$scope.category = Categories.get({ 
				categoryId: $stateParams.categoryId
			});
		};
	}
]);