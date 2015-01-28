'use strict';

angular.module('users').directive('signupModal', ['$modal','$http','$location',
	function($modal,$http,$location) {
        return {
            template: '<div>{{modalView}}</div>',
            restrict: 'E',

            link: function postLink(scope, element, attrs) {

                // Fires every time url changes to test for conditions
             scope.$on('$locationChangeStart',function () {

                 var params = {};
                 params.isLoggedIn = false;

                 $http.get('http://localhost:3000/users/me').success(function (data) {
                     //var projectPath = $location.path();

                     if (data !== 'null') {
                         params.isLoggedIn = true;
                     }
                     if (!params.isLoggedIn && $location.path() === '/projects/create') {



                         scope.modalView = $modal.open({
                             templateUrl: '/modules/users/views/signin.client.view.html',
                             size: 'lg',
                             backdropClass: 'sign-in-modal-background',
                             windowClass: 'sign-in-modal-background',
                             backdrop: false,
                             controller: function($scope,$modalInstance){
                                 $scope.closeModal = function(){

                                     $modalInstance.close();
                                 };
                             }

                             }).result.then().opened.then();


                         };




                 });

                });


            }
}
}
]);

