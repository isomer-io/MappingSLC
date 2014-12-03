'use strict';

angular.module('core').directive('inputDate', ['$scope', 'element', 'attrs',
 function paperInputDate($templateCache) {
  function linkFn($scope, element, attrs) {
   $scope.isRequired = angular.isDefined(attrs.required);
   $scope.state = {
    opened : false
   };

   $scope.openDatePicker = function($event) {
    event.preventDefault(event);
    event.stopPropagation();
    $scope.state.opened = true;
   };


  }
  return {
   compile: function(tElement,tAttrs){
    var groupEl = tElement[0].querySelector('.paper-input');
    var input = tElement[0].querySelector('input');
    // if(tAttrs.date){
    groupEl.setAttribute('ng-click','openDatePicker($event)');
    input.setAttribute('is-open','state.opened');
    input.setAttribute('datepicker-popup','dd.MM.yyyy');
    // }
    return linkFn;
   },
   template:$templateCache.get('paperInput'),
   $scope: {
    label: '@',
    type: '@',
    modelRef: '='
   }
  }
 }



]);