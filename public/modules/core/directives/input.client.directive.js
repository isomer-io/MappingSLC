'use strict';

angular.module('core').directive('input', ['$scope', 'element', 'attrs',
		function paperInput($templateCache) {
			function linkFn($scope, element, attrs) {
				$scope.isRequired = angular.isDefined(attrs.required);
				$scope.isDatepicker = angular.isDefined(attrs.date);
				$scope.state = {
					opened : false
				};

				if ($scope.isDatepicker) {

					$scope.openDatePicker = function($event) {
						//event.preventDefault(event);
						//event.stopPropagation();
						$scope.state.opened = true;
					};

				}
			}
			return {
				link: linkFn,
				template: $templateCache.get('paperInput'),
				$scope: {
					label: '@',
					type: '@',
					modelRef: '='
				}
			}
		}
]);