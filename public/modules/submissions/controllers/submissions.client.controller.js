'use strict';

// Submissions controller
angular.module('submissions').controller('SubmissionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Submissions',
	function($scope, $stateParams, $location, Authentication, Submissions ) {
		$scope.authentication = Authentication;

		// Create new Submission
		$scope.create = function() {
			// Create new Submission object
			var submission = new Submissions ({
				name: this.name,
                bio: this.bio,
                email: this.email,
                projectTitle: this.projectTitle,
                neighborhood: this.neighborhood,
                map: this.map,
                zipCode: this.zipCode,
                description: this.description,
                fileUpload: this.fileUpload
			});

			// Redirect after save
			submission.$save(function(response) {
				$location.path('submissions/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
            this.bio = '';
            this.email = '';
            this.projectTitle = '';
            this.neighborhood = '';
            this.map = '';
            this.zipCode = '';
            this.description = '';
            this.fileUpload = '';

		};

		// Remove existing Submission
		$scope.remove = function( submission ) {
			if ( submission ) { submission.$remove();

				for (var i in $scope.submissions ) {
					if ($scope.submissions [i] === submission ) {
						$scope.submissions.splice(i, 1);
					}
				}
			} else {
				$scope.submission.$remove(function() {
					$location.path('submissions');
				});
			}
		};

		// Update existing Submission
		$scope.update = function() {
			var submission = $scope.submission ;

			submission.$update(function() {
				$location.path('submissions/' + submission._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Submissions
		$scope.find = function() {
			$scope.submissions = Submissions.query();
		};

		// Find existing Submission
		$scope.findOne = function() {
			$scope.submission = Submissions.get({ 
				submissionId: $stateParams.submissionId
			});
		};
	}
]);