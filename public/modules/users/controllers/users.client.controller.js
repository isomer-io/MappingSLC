'use strict';

// Users controller
angular.module('users').controller('UsersController', ['$scope', '$stateParams', '$location', 'AuthenticationService', 'Users', '_',
    function($scope, $stateParams, $location, AuthenticationService, Users, _) {
        $scope.authentication = AuthenticationService;
        $scope.gridOptions = {
            data: 'users',
            enablePinning: true,
            enableColumnResize: true,
            showFooter: true,
            columnDefs: 'gridFields'
        };

        $scope.query = {};

        $scope.getSchema = function() {
            Users.query({
                userId: 'schema'
            }, function(userSchema) {
                var fields = [];
                var field = null;

                _.each(userSchema, function(schemaField) {
                    if (schemaField.path !== '_id') {
                        field = {
                            path: schemaField.path,
                            title: _.string.humanize(schemaField.path)
                        };

                        if (schemaField.instance) {
                            if (schemaField.enumValues && schemaField.enumValues.length) {
                                field.type = 'Select';
                                field.options = schemaField.enumValues;
                            } else {
                                field.type = schemaField.instance;
                            }
                        } else {
                            if (schemaField.caster) {
                                if (schemaField.caster.enumValues) {
                                    field.type = 'Options';
                                    field.options = schemaField.caster.enumValues;
                                }
                            } else {
                                field.type = 'Date';
                            }
                        }

                        fields.push(field);
                    }
                });

                $scope.fields = fields;
                $scope.buildGridOptions();
            });
        };

        $scope.buildGridOptions = function() {
            var gridFields = [{
                field: "_id",
                displayName: 'ID',
                cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a ng-href="#!/users/{{row.getProperty(col.field)}}/edit" ng-cell-text>{{COL_FIELD}}</span></div>',
                pinned: true
            }];

            _.each($scope.fields, function(schemaField) {
                gridFields.push({
                    field: schemaField.path,
                    displayName: schemaField.title
                })
            });

            $scope.gridFields = gridFields;
        };

        // Create new User
        $scope.create = function() {
            // Create new User object
            var user = new Users({
                name: this.name
            });

            // Redirect after save
            user.$save(function(response) {
                $location.path('users/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear form fields
            this.name = '';
        };

        // Remove existing User
        $scope.remove = function(user) {
            if (user) {
                user.$remove();

                for (var i in $scope.users) {
                    if ($scope.users[i] === user) {
                        $scope.users.splice(i, 1);
                    }
                }
            } else {
                $scope.user.$remove(function() {
                    $location.path('users');
                });
            }
        };

        // Update existing User
        $scope.update = function(user) {
            user.$update(function() {

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Users
        $scope.find = function() {
            $scope.users = Users.query($scope.query);
        };

        // Find existing User
        $scope.findOne = function() {
            $scope.user = Users.get({
                userId: $stateParams.userId
            });
        };

        $scope.init = function() {
            $scope.getSchema();
            $scope.find();
        };
    }
]);