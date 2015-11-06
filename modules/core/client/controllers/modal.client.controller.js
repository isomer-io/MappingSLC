'use strict';

angular.module('core').controller('ModalController', ['$scope', '$uibModalInstance',
    function($scope, $uibModalInstance) {

            //$scope.items = items;
            //$scope.selected = {
            //    item: $scope.items[0]
            //};

            $scope.ok = function () {
                $uibModalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
    }
]);
