'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$rootScope',
	function($scope, Authentication, $rootScope) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		//toggles off/on for main overlay page and menu
		$scope.toggle = true;

//        connects to the sidebar client controller to open the modal when 'home' is clicked on the sidebar

        $rootScope.$on('SHOW_HOME', function() {
            $scope.toggleSideBar = true;
        });

//        connects to the sidebar client controller to close the modal when the sidebar is opened

        $rootScope.$on('CLOSE_HOME', function(){
                $scope.toggleSideBar = false;
            });

        //if we see a menu event, turn toggle back to true

		$scope.featuredProjects = {};

		//placeholder for featured projects images
		//todo once admin module is built, create a function that makes photo1 and 2 dynamic rather than hard-coded

		$scope.photo1 = 'as_thumb.png';
		$scope.photo2 = 'wli_thumb.png';
		$scope.photo3 = 'dw_thumb.png';

	}
]);