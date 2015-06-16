'use strict';

angular.module('core').controller('HomeController', ['$scope', 'AuthenticationService', 'ApiKeys', '$http', 'MarkerDataService', 'AdminAuthService',
	function ($scope, AuthenticationService, ApiKeys, $http, MarkerDataService, AdminAuthService) {
		$scope.authentication = AuthenticationService;
		$scope.isAdmin = AdminAuthService;

		//for overlay
		$scope.featuredProjects = {};

		//placeholder for featured projects images
		//todo once admin module is built, create a function that makes photo1 and 2 dynamic rather than hard-coded
		$scope.photo0 = 'chris--bw-2.jpg';
		$scope.photo1 = 'as_thumb_150.jpg';
		$scope.photo2 = 'wli_thumb_150.jpg';
		$scope.photo3 = 'dw_thumb_150.jpg';
		$scope.photo4 = 'as_thumb_bw.png';


		/**
		 *
		 * Animation Functionality
		 *
		 **/

		$scope.overlayActive = true;
		$scope.menuOpen = false;
		var changeMapFrom = null;

		$scope.toggleOverlayFunction = function (source) {
			if ($scope.overlayActive === true && source === 'overlay') {
				console.log('current if is \'overlay\'');
				$scope.overlayActive = false;
				changeMapFrom('gray-map');
			} else if ($scope.overlayActive === true && source === 'menu-closed') {
				console.log('current if is \'overlay \'true\' and \'menu-closed\'');
				$scope.overlayActive = false;
				$scope.triggerMenu = !$scope.triggerMenu;
				$scope.menuOpen = true;
				changeMapFrom('gray-map');
			} else if ($scope.overlayActive === false && source === 'menu-open') {
				console.log('current if is \'overlay \'false\' and \'menu-open\'');
				console.log('$scope.menuOpen: ', $scope.menuOpen);
				//if (getAttribute('active')) {
				//    console.log('in it!');
				//    $scope.menuOpen = false;
				//}
			} else if ($scope.overlayActive === false && source === 'menu-closed') {
				console.log('current if is \'overlay \'false\' and \'menu-closed\'');
				$scope.triggerMenu = !$scope.triggerMenu;
				if ($scope.menuOpen) {
					$scope.menuOpen = false;
				} else {
					$scope.menuOpen = true;
				}
			} else if ($scope.overlayActive === false && source === 'home') {
				console.log('current if is \'home\'');
				$scope.menuOpen = false;
				$scope.overlayActive = true;
			}
		};


		//atrribution toggle
		$scope.attributionFull = false;
		$scope.attributionText = '<div style="padding: 0 5px 0 2px"><a href="http://www.mapbox.com/about/maps/" target="_blank">Mapbox</a> & <a href="http://leafletjs.com/" target="_blank">Leaflet</a>, with map data by <a href="http://openstreetmap.org/copyright">OpenStreetMap©</a> | <a href="http://mapbox.com/map-feedback/" class="mapbox-improve-map">Improve this map</a></div>';


		//subscribe form animations
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


		/**
		 *
		 * Map Functionality
		 *
		 **/


		$scope.markers = true;
		$scope.filters = true;
		$scope.censusDataTractLayer = true;
		$scope.googlePlacesLayer = false;
		//$scope.toggleDetails = false;
		$scope.sidebarToggle = false;

		var dataBoxStaticPopup = null,
			dataBoxStaticPopupFn = null,
			tractData = {},
			censusTractData = null;


		//service that returns api keys
		ApiKeys.getApiKeys()
			.success(function (data) {
				mapFunction(data.mapboxKey, data.mapboxSecret);
			})
			.error(function (data, status) {
				alert('Failed to load Mapbox API key. Status: ' + status);
			});


	//	coordinates: [
	//		-111.702,
	//		40.773
	//	]
	//},
	//properties: {
	//title: 'Peregrine The Espresso',
	//	description: '1718 14th St NW, Washington, DC',
	//	// one can customize markers by adding simplestyle properties
	//	// https://www.mapbox.com/guides/an-open-platform/#simplestyle
	//	'marker-size': 'large',
	//	'marker-color': '#BE9A6B',
	//	'marker-symbol': 'cafe'

//
//call the .map and add functionality
//
		var mapFunction = function (key, accessToken) {
			//creates a Mapbox Map
			L.mapbox.accessToken = accessToken;

			//'info' id is part of creating tooltip with absolute position
			var info = document.getElementById('info');

			var map = L.mapbox.map('map', null, {
				infoControl: false, attributionControl: false
			})
				.setView([40.773, -111.902], 12)
				//allow users to share maps on social media
				// source: https://www.mapbox.com/mapbox.js/api/v2.1.5/l-mapbox-sharecontrol/
				.addControl(L.mapbox.shareControl())
				.addControl(L.mapbox.geocoderControl('mapbox.places'));



			var grayMap = L.mapbox.tileLayer('poetsrock.b06189bb'),
				mainMap = L.mapbox.tileLayer('poetsrock.la999il2'),
				topoMap = L.mapbox.tileLayer('poetsrock.la97f747'),
				greenMap = L.mapbox.tileLayer('poetsrock.jdgpalp2'),
				landscape = L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png'),
				comic = L.mapbox.tileLayer('poetsrock.23d30eb5'),
				watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png');

			var layers = {
				'Main Map': mainMap,
				'Topo Map': topoMap,
				'Green Map': greenMap,
				'Landscape': landscape,
				'Comically Yours': comic,
				'Gray Day': grayMap,
				'Watercolor': watercolor
			};

			grayMap.addTo(map);
			L.control.layers(layers).addTo(map);

			changeMapFrom = function (currentMap) {
				if (currentMap === 'gray-map') {
					map.addLayer(mainMap);
					map.removeLayer(grayMap);
				} else {
					map.addLayer(grayMap);
					map.removeLayer(mainMap);
				}
			};

			var sidebar = L.control.sidebar('sidebar', {
				closeButton: true,
				position: 'left'
			}).addTo(map);


			//service that returns project markers
			MarkerDataService.getMarkerData()
				.success(function (markerData) {
					//console.log('markerData: ', markerData);
					$scope.addProjectMarkers(markerData);
					//console.log('marker data lng \n: ', markerData[0].lng);
					//for (var prop in markerData) {
					//    console.log('markerData[prop].lng: \n', markerData[prop].lng);
					//}
					//console.log('marker array length: ', markerData.features.length);
					//console.log('marker data value coords: ', markerData.features[0]['geometry']['coordinates']);
					//console.log('marker data value title: ', markerData.features[0]['properties']['title']);
					//console.log('marker data value description: ', markerData.features[0]['properties']['description']);
				})
				.error(function (data, status) {
					alert('Failed to load project markers. Status: ' + status);
				});


			////add markers from marker data
			//$scope.addProjectMarkers = function(markerData){
			//	//loop through markers array and return values for each property
			//	for(var i = 0; i < markerData.features.length; i++){
			//
			//	L.mapbox.featureLayer({
			//		// this feature is in the GeoJSON format: see geojson.org
			//		// for the full specification
			//		type: 'Feature',
			//		geometry: {
			//			type: 'Point',
			//			// coordinates here are in longitude, latitude order because
			//			// x, y is the standard for GeoJSON and many formats
			//			coordinates: markerData.features[i]['geometry']['coordinates']
			//		},
			//		properties: {
			//			title: markerData.features[i]['properties']['title'],
			//			description: markerData.features[i]['properties']['description'],
			//			// one can customize markers by adding simplestyle properties
			//			// https://www.mapbox.com/guides/an-open-platform/#simplestyle
			//			'marker-size': 'large',
			//			'marker-color': markerData.features[i]['properties']['marker-color'],
			//			'marker-symbol': markerData.features[i]['properties']['marker-symbol']
			//		}
			//	})
			//
			//	//create toogle for marker event that toggles sidebar on marker click
			//	.on('click', function (e) {
			//		//center the map when a project marker is clicked
			//		map.panTo(e.layer.getLatLng());
			//
			//		//$scope.$apply(
			//		//    function(){
			//		//        $scope.toggleDetails = !$scope.toggleDetails;
			//		//    }
			//		//);
			//		sidebar.getContainer();
			//		//sidebar.setContent('test <b>test</b> test');
			//		if ($scope.sidebarToggle === false) {
			//			//$rootScope.animateLogoCheck = true;
			//			setTimeout(function () {
			//				sidebar.open('settings');
			//			}, 500);
			//			$scope.sidebarToggle = true;
			//		} else {
			//			setTimeout(function () {
			//				sidebar.close();
			//			}, 500);
			//			$scope.sidebarToggle = false;
			//		}
			//	})
			//	.addTo(map);
			//	}
			//};

			//add markers from marker data
			$scope.addProjectMarkers = function(markerData) {
				console.log('markerData: \n', markerData);
				////loop through markers array and return values for each property
				//for(var i = 0; i < 4; i++){
				for (var prop in markerData) {
					console.log('markerData[prop].lng: \n', markerData[prop].lng);
				}
				//L.mapbox.featureLayer({
				//	// this feature is in the GeoJSON format: see geojson.org
				//	// for the full specification
				//	type: 'Feature',
				//	geometry: {
				//		type: 'Point',
				//		// coordinates here are in longitude, latitude order because
				//		// x, y is the standard for GeoJSON and many formats
				//		coordinates: markerData.features[i]['geometry']['coordinates']
				//	},
				//	properties: {
				//		title: markerData.features[i]['properties']['title'],
				//		description: markerData.features[i]['properties']['description'],
				//		// one can customize markers by adding simplestyle properties
				//		// https://www.mapbox.com/guides/an-open-platform/#simplestyle
				//		'marker-size': 'large',
				//		'marker-color': markerData.features[i]['properties']['marker-color'],
				//		'marker-symbol': markerData.features[i]['properties']['marker-symbol']
				//	}
				//})

			};

			//style the polygon tracts
			var style = {
				'stroke': true,
				'clickable': true,
				'color': "#00D",
				'fillColor': "#00D",
				'weight': 1.0,
				'opacity': 0.2,
				'fillOpacity': 0.0,
				'className': ''  //String that sets custom class name on an element
			};
			var hoverStyle = {
				'color': "#00D",
				"fillOpacity": 0.5,
				'weight': 1.0,
				'opacity': 0.2,
				'className': ''  //String that sets custom class name on an element
			};

			var hoverOffset = new L.Point(30, -16);

			ApiKeys.getTractData()
				.success(function (tractData) {
					tractDataLayer(tractData);
				})
				.error(function (tractData) {
					alert('Failed to load tractData. Status: ' + status);
				});
			var tractDataLayer = function (tractData) {
				censusTractData = L.geoJson(tractData, {
						style: style,
						onEachFeature: function (feature, layer) {
							if (feature.properties) {
								var popupString = '<div class="popup">';
								for (var k in feature.properties) {
									var v = feature.properties[k];
									popupString += k + ': ' + v + '<br />';
								}
								popupString += '</div>';
								layer.bindPopup(popupString);
							}
							if (!(layer instanceof L.Point)) {
								layer.on('mouseover', function () {
									layer.setStyle(hoverStyle);
									//layer.setStyle(hoverOffset);
								});
								layer.on('mouseout', function () {
									layer.setStyle(style);
									//layer.setStyle(hoverOffset);
								});
							}

						}
					}
				);
			};

			dataBoxStaticPopupFn = function (dataBoxStaticPopup) {

				// Listen for individual marker clicks.
				dataBoxStaticPopup.on('mouseover', function (e) {
					// Force the popup closed.
					e.layer.closePopup();

					var feature = e.layer.feature;
					var content = '<div><strong>' + feature.properties.title + '</strong>' +
						'<p>' + feature.properties.description + '</p></div>';

					info.innerHTML = content;
				});

				function empty() {
					info.innerHTML = '<div><strong>Click a marker</strong></div>';
				}

				// Clear the tooltip when .map is clicked.
				map.on('move', empty);

				// Trigger empty contents when the script
				// has loaded on the page.
				empty();

			};

			//Google Places API
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

			//create toggle/filter functionality for Census Tract Data
			$scope.toggleCensusData = function () {
				if (!$scope.censusDataTractLayer) {
					map.removeLayer(censusTractData);
					map.removeLayer(dataBoxStaticPopup);
				} else {
					map.addLayer(censusTractData);
					map.addLayer(dataBoxStaticPopup);

				}
			};

			//create toggle/filter functionality for Census Tract Data
			$scope.toggleGooglePlacesData = function () {
				if ($scope.googlePlacesLayer) {
					map.removeLayer(googlePlacesMarkerLayer);
				} else {
					map.addLayer(googlePlacesMarkerLayer);
				}
			};


			//    //connects to the sidebar client controller to open the modal when 'home' is clicked on the sidebar
			//    $rootScope.$on('SHOW_MAP', function () {
			//        //mainMap.addTo(.map);
			//        .map.addLayer(mainMap);
			//        .map.removeLayer(grayMap);
			//    });
			//
			//    //connects to the sidebar client controller to close the modal when the sidebar is opened
			//    $rootScope.$on('HIDE_MAP', function () {
			//        grayMap.addTo(.map);
			//        mainMap.removeLayer(.map);
			//    });
		};


	}
]);