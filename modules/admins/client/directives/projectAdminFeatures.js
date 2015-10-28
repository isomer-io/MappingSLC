'use strict';

angular.module('admins').directive('projectAdminFeatures', function () {
	return {
		restrict: 'E',
		templateUrl: '/modules/admins/client/directives/views/project-admin-features.html',

		//require: 'ngModel',
		link: function (scope, element, attrs, modelCtrl) {
			if(scope.project.status === 'published'){
				console.log('pub be hooked, yo, up yeah up');
				//fire pub confirm modal and then publish project function
			}

		}

	};
});
