'use strict';

angular.module('core').controller('FileUploadController', ['$scope', 'AuthenticationService', '$timeout', '$compile', 'Upload', '$location', '$http', '$rootScope', 'UserData', 'Users',
	function ($scope, AuthenticationService, $timeout, $compile, Upload, $location, $http, $rootScope, UserData, Users) {

		$scope.authentication = AuthenticationService;
		$scope.user = AuthenticationService.user;
		$scope.imgUrl = '';
		$scope.log = '';


		$scope.uploadFile = function (files) {

			console.log('files: ', files);

			$http.post('/uploads/users', {
				headers: {'content-type': files.type},
				data: { files: files }
			}).
				success(function (fileData) {
					$scope.imgSrc = fileData;
				}).
				error(function (fileError) {
					console.log('file upload error: ', fileError);
				});
		};


		//// Update existing Project
		//var updateProfilePic = function () {
		//	$scope.success = $scope.error = null;
		//	console.log('$scope.user1', $scope.user);
		//	var user = new Users($scope.user);
		//	console.log('user', user);
		//	console.log('$scope.user2', $scope.user);
		//	console.log('user.$update', user.$update);
		//
		//	user.$update(function (response) {
		//		$scope.success = true;
		//		AuthenticationService.user = response;
		//	}, function (response) {
		//		$scope.error = response.data.message;
		//	})
		//};


		//$scope.uploadFile = function (files) {
			//var file = files;
			//console.log('files', files );

			//if (angular.isArray(files) ) {
			//	files = files[0];
			//	console.log('files[0]: ', files[0]);
			//}else{
			//	console.log('error ln 36');
			//}
			//
			//// confirm file type client-side
			//if (files.type !== 'image/png' && files.type !== 'image/jpeg') {
			//	console.log('error ln 41: Only PNG and JPEG are accepted.');
			//	return;
			//}

			//var fileReader = new FileReader(files);
			//console.log('fileReader: ', fileReader);
			// fileReader.readAsArrayBuffer(file);
			//console.log('fileReader.readAsArrayBuffer(file): ', fileReader.readAsArrayBuffer(file) );
			//fileReader.onload = function(e) {


//$scope.uploadFile = function (files) {
//
//		console.log('files: ', files);
//
//	$http.post('/uploads/users', {
//		headers: {'content-type': files.type},
//		data: { files: files }
//	}).
//	success(function (fileData) {
//			$scope.imgSrc = fileData;
//	}).
//	error(function (fileError) {
//		console.log('file upload error: ', fileError);
//	});
//};
			//$scope.log = 'Upload completed on: ' + moment().format('MMMM Do YYYY, h:mm:ss a') + '\n' + 'File "' + config.file.name + '" has been uploaded. \nResponse: ' + JSON.stringify(data) + '\n' + $rootScope.filePath + '\n' + $scope.log;
		//};





//$http.post('/uploads', {
				//	headers: {'Content-Type': file.type},
				//	data: e.target.result
				//	});


			//		then(function(response) {
			//		//success;
			//	}, null, function(evt) {
			//		$scope.progress[index] = parseInt(100.0 * evt.loaded / evt.total);
			//	});
			//};














































		// Find a list of Projects
		$scope.find = function () {
			$scope.projects = Projects.query();
		};

		// Find existing Project
		$scope.findOne = function () {
			$scope.project = Projects.get({
				projectId: $stateParams.projectId
			});
		};




		//$scope.uploadFile = function (files) {
		//	var file = files;
		//
		//	if (angular.isArray(files)) {
		//		files = files[0];
		//	}
		//
		//	// This is how I handle file types in client side
		//	if (files.type !== 'image/png' && files.type !== 'image/jpeg') {
		//		alert('Only PNG and JPEG are accepted.');
		//		return;
		//	}
		//
		//	$scope.uploadInProgress = true;
		//	$scope.uploadProgress = 0;
		//
		//	$scope.upload = Upload.upload({
		//		url: '/uploads',
		//		'Content-Type': files.type,
		//		file: files,
		//		method: 'Post',
		//		data: {}
		//	}).progress(function (event) {
		//		$scope.uploadProgress = Math.floor(event.loaded / event.total);
		//		//$scope.$apply();
		//		console.log('progress: ' + $scope.uploadProgress);
		//		$scope.log = 'upload progress: ' + ($scope.uploadProgress * 100) + '%';
		//	}).success(function (data, status, headers, config) {
		//		$scope.uploadCommplete = true;
		//		$scope.uploadInProgress = false;
		//		//console.log('data', data);
		//		//console.log('headers', headers);
		//		//console.log('config', config);
		//		updateProfilePic();
		//
		//		$scope.imgSrc = 'http://localhost:3000/' + data;
		//		$rootScope.filePath = data;
		//		$scope.log = 'Upload completed on: ' + moment().format('MMMM Do YYYY, h:mm:ss a') + '\n' + 'File "' + config.file.name + '" has been uploaded. \nResponse: ' + JSON.stringify(data) + '\n' + $rootScope.filePath + '\n' + $scope.log;
		//	}).error(function (err) {
		//		$scope.uploadInProgress = false;
		//		console.log('err, ln 68 client.controller' + err.message || err);
		//	});
		//
		//};






	}

]);
