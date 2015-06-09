'use strict';

angular.module('core').controller('FileUploadController', ['$scope', 'AuthenticationService', '$timeout', '$compile', 'Upload', '$location', '$http',
	function ($scope, AuthenticationService, $timeout, $compile, Upload, $location, $http) {
		$scope.authentication = AuthenticationService;

		$scope.uploadFile = function (files) {
			var file = files;
			$scope.log = '';

			var upload = Upload.upload({
				url: '/uploads',
				'Content-Type': "image/jpg",
				file: file,
				method: 'Post',
				data: {}
			}).progress(function (evt) {
				var progress = parseInt(100.0 * evt.loaded / evt.total);
				console.log('progress: ' + progress);
			})
				.success(function (data, status, headers, config) {
					console.log('data', data);
					console.log('headers', headers);
					console.log('config', config);

					$scope.imgSrc = 'http://localhost:3000/' + data;
					//console.log($scope.imgSrc);

					$scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
					//$scope.$apply();

				})
				.error(function (err) {
					console.log('err, ln 68 client.controller', err);
				});

		};

	}
]);