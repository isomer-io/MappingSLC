'use strict';

//Google Places API

angular.module('core').factory('googlePlacesService', ['$http',
	function ($http) {
		var googlePlacesMarker = null;
		var googlePlacesMarkerLayer = null;
		var googlePlacesMarkerArray = [];

		var googlePlacesData = function () {
			$http.get('/places').success(function (poiData) {

				var placeLength = poiData.results.length;
				for (var place = 0; place < placeLength; place++) {

					var mapLat = poiData.results[place].geometry.location.lat;
					var mapLng = poiData.results[place].geometry.location.lng;
					var mapTitle = poiData.results[place].name;

					googlePlacesMarker = L.marker([mapLat, mapLng]).toGeoJSON();

					googlePlacesMarkerArray.push(googlePlacesMarker);
				} //end of FOR loop

				googlePlacesMarkerLayer = L.geoJson(googlePlacesMarkerArray, {
					style: function (feature) {
						return {
							'title': mapTitle,
							'marker-size': 'large',
							//'marker-symbol': mapSymbol(),
							'marker-symbol': 'marker',
							'marker-color': '#00295A',
							'riseOnHover': true,
							'riseOffset': 250,
							'opacity': 0.5,
							'clickable': true
						}
					}
				})
			});
		};


	}
]);