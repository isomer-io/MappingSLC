'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication','$modal','$state',
	function($scope, $http, $location, Authentication,$modal, $state) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;
                   //$modalInstance.close();
				//And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				//If successful we assign the response to the global user model
				$scope.authentication.user = response;
               //$modalInstance.close();

                $scope.closeModal();

			}).error(function(response) {


				$scope.error = response.message;
			});
		};
        $scope.goToSignUp = function($state){
            $state.go('signup');
        };

		// Reroutes from sign in to sign up on modal
/*
		$scope.modalOpenSignUp = function(){
                var isSwitched = false;
			$modal.open({
				templateUrl:function(){
                    if (!isSwitched){
                        isSwitched = false;
                       return '/modules/users/views/signup.client.view.html';

                    }else{
                        return '/modules/users/views/signin.client.view.html';
                    }
                },
				size:'lg',
				backdropClass:'sign-in-modal-background',
				windowClass: 'sign-in-modal-background',
				backdrop:false,
                controller: function($scope){

                }

			}).then(function(){

                console.log('Success!!!!!');
            });
            };*/





	}
]);