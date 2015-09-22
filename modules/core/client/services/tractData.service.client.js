'use strict';

//Google Places API

angular.module('core').factory('tractDataService', ['$scope', 'ApiKeys',
	function ($scope, ApiKeys) {

		var dataBoxStaticPopup = null,
			tractData = {},
			censusTractData = null;


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

		$scope.dataBoxStaticPopupFn = function (dataBoxStaticPopup) {

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

			// Trigger empty contents when the script has loaded on the page.
			empty();

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

	}
]);