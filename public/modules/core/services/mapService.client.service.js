'use strict';

angular.module('core').service('mapService', [
	function ($scope) {
		// Various Services for Map Functionality

		this.featuredProjects = function (markerData) {
			var featureProjectsArray = [];
			for (var prop in markerData) {
				var i = 0;
				if (i < 2 && markerData[prop].featured) {      //setup for loop to end after finding the first three featured projects
					var featuredProject = {
						thumb: markerData[prop].thumbnail,
						projectId: markerData[prop]._id,
						shortTitle: markerData[prop].shortTitle
					};
					featureProjectsArray.push(featuredProject);
				}
				i++;
			}
		};

		this.markerColorFn = function (markerData, prop) {
			if (markerData[prop].category === 'video') {
				return '#ff0011';
			} else if (markerData[prop].category === 'multimedia') {
				return '#ff0101';
			} else if (markerData[prop].category === 'essay') {
				return '#0015ff';
			} else if (markerData[prop].category === 'literature') {
				return '#15ff35';
			} else if (markerData[prop].category === 'interview') {
				return 'brown';
			} else if (markerData[prop].category === 'map') {
				return 'yellow';
			} else if (markerData[prop].category === 'audio') {
				return '#111111';
			} else {
				return '#00ff44';
			}
		};
	}
]);