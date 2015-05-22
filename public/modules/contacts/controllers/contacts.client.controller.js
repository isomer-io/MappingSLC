'use strict';

// Contacts controller
angular.module('contacts').controller('ContactsController', ['$scope', '$stateParams', '$location', 'AuthenticationService', 'Contacts', '$http',
	function($scope, $stateParams, $location, AuthenticationService, Contacts, $http) {
		$scope.authentication = AuthenticationService;

		// Create new Contact
		$scope.create = function() {
			// Create new Contact object
			var contact = new Contacts ({
				firstName: this.firstName,
				lastName: this.lastName,
				email: this.email,
				zip: this.zip,
				newsletter: this.newsletter,
				message: this.message
			});

			// Redirect after save
			contact.$save(function(response) {
				$location.path('contacts/' + response._id);

				// Clear form fields
				$scope.firstName = '';
				$scope.lastName = '';
				$scope.email = '';
				$scope.zip = '';
				$scope.newsletter = '';
				$scope.message = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Contact
		$scope.remove = function(contact) {
			if ( contact ) { 
				contact.$remove();

				for (var i in $scope.contacts) {
					if ($scope.contacts [i] === contact) {
						$scope.contacts.splice(i, 1);
					}
				}
			} else {
				$scope.contact.$remove(function() {
					$location.path('contacts');
				});
			}
		};

		// Update existing Contact
		$scope.update = function() {
			var contact = $scope.contact;

			contact.$update(function() {
				$location.path('contacts/' + contact._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Contacts
		$scope.find = function() {
			$scope.contacts = Contacts.query();
		};

		// Find existing Contact
		$scope.findOne = function() {
			$scope.contact = Contacts.get({ 
				contactId: $stateParams.contactId
			});
		};


		var cssLayout = function(){
			[].slice.call( document.querySelectorAll( 'input.input_field' ) ).forEach( function( inputEl ) {
				// in case the input is already filled..
				if( inputEl.value.trim() !== '' ) {
					classie.add( inputEl.parentNode, 'input-filled' );
				}

				// events:
				inputEl.addEventListener( 'focus', onInputFocus );
				inputEl.addEventListener( 'blur', onInputBlur );
			} );

			function onInputFocus( ev ) {
				classie.add( ev.target.parentNode, 'input-filled' );
			}

			function onInputBlur( ev ) {
				if( ev.target.value.trim() === '' ) {
					classie.remove( ev.target.parentNode, 'input-filled' );
				}
			}
		};
		cssLayout();

		$scope.sentToday = null;
		//get data from back end for display in table
		$http.get('/contacts').
			success(function(messageData){
				console.log(messageData);
				$scope.messageData = messageData;

				$scope.sentToday = function(){
					//if(messageData.created === moment()){
					//	return moment().calendar(messageData.created);
					//}else{
						return moment().calendar(messageData.created);
					//}
				};

			}).
			error(function(data, status){

			});

		//table sort for contact messages


		//for adming panel
		//$scope.dateMoment = moment().format("MMM Do YYYY");
		//$scope.dateMoment = ;
		$scope.dateNow = Date.now();

		$scope.toggleSort = true;
		$scope.oneAtATime = true;








	}
]);


