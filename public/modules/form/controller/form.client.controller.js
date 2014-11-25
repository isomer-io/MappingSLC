'use strict';

angular.module('signup-form').controller('formController', ['$scope',
    function($scope) {

        // store all form data in this object
        $scope.formData = {};

        // function to process the form
        $scope.processForm = function() {
            alert('Fuck Yeah!');
        };

        //$scope.onkeydown = checkKey;
        //
        //$scope.checkKey = function (e) {
        //
        //    e = e || window.event;
        //
        //    if (e.keyCode === '37') {
        //        // left arrow
        //        //go backwards in form
        //    }
        //    else if (e.keyCode === '39') {
        //        // right arrow
        //        //go forwards in form
        //    }
        //}

    }

]);