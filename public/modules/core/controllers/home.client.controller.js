'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$rootScope', '$location',
	function($scope, Authentication, $rootScope, $location) {


        //returns true if view is home page/core.client.view.html
        var homePageCheck = function (){

            if($location.path() === '/'){
                return true;
            }
        };
        console.log('homePageCheck', homePageCheck());


        // This provides Authentication context.
		$scope.authentication = Authentication;
		////toggles off/on for main overlay page and menu
		//$scope.mainMenuModalToggle = true;
        $rootScope.animateLogoCheck = false;
        $scope.animateMainOverlayCheck = false;
        $scope.animateFooterOverlayCheck = false;

        $rootScope.animateSmallLogo = function(){
            //animate into the small logo from round 'X' on main modal
            if($rootScope.animateLogoCheck === false) {
                $rootScope.animateLogoCheck = true;
                $scope.animateMainOverlayCheck = true;
                $scope.animateFooterOverlayCheck = true;
                $rootScope.triggerMenuCount = 0;
                console.log('$rootScope.triggerMenuCount (on core ctrl): ', $rootScope.triggerMenuCount);
                //connects to the home client controller to close the map when the main menu modal is closed
                $scope.showMapView = function() {
                    $rootScope.$broadcast('SHOW_MAP');
                    console.log('click button to show map, & here\'s the $rootScope.$broadcast: ', $rootScope.$broadcast())
                }();
            }else{
                $rootScope.animateLogoCheck = false;
                $scope.animateMainOverlayCheck = false;
                $scope.animateFooterOverlayCheck = false;
                //connects to the home client controller to close the map when the main menu modal is closed
                $scope.hideMapView = function() {
                    $rootScope.$broadcast('HIDE_MAP');
                }();
                console.log('click button to hide map, & here\'s the $rootScope.$broadcast: ', $rootScope.$broadcast())
            }
        };

        //connects to the sidebar client controller to open the modal when 'home' is clicked on the sidebar
        $rootScope.$on('SHOW_HOME', function() {
            if (!$scope.mainMenuModalToggle) {
                //$scope.mainMenuModalToggleSmallLogo = true;
                $scope.mainMenuModalToggleSideBar = false;

            }
        });

        //connects to the sidebar client controller to close the modal when the sidebar is opened
        $rootScope.$on('CLOSE_HOME', function(){
            $scope.mainMenuModalToggleSideBar = false;
        });

		$scope.featuredProjects = {};

		//placeholder for featured projects images
		//todo once admin module is built, create a function that makes photo1 and 2 dynamic rather than hard-coded

		$scope.photo1 = 'as_thumb_150.jpg';
		$scope.photo2 = 'wli_thumb_150.jpg';
		$scope.photo3 = 'dw_thumb_150.jpg';

	}
]);