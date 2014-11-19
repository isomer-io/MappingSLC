'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		//toggles off/on for main overlay page and menu
		$scope.toggle = true;
		$scope.sidemenu = false;


		//var sideMenuOn = element(by.css('containerOn'));
		//var sideMenuOff = element(by.css('containerOn'));
        //
		//it('should check ng-show / ng-hide', function() {
		//	expect(sideMenuOn.isDisplayed()).toBeTruthy();
		//	expect(sideMenuOff.isDisplayed()).toBeFalsy();
        //
		//$scope.element(by.model('clicked')).click();
        //
		//	expect(sideMenuOn.isDisplayed()).toBeFalsy();
		//	expect(sideMenuOff.isDisplayed()).toBeTruthy();
		//});



		//placeholder for featured projects images
		//todo once admin module is built, create a function that makes photo1 and 2 dynamic rather than hard-coded
		$scope.photo1 = 'as';
		$scope.photo2 = 'dw';
	}
]);