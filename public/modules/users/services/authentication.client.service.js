'use strict';

// Authentication service for user variables
angular.module('users').factory('AuthenticationService', [

	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);