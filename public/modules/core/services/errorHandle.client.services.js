//'use strict';
//
//angular.module('core').factory('ErrorHandleService', ['$httpProvider',
//    function($httpProvider){
//    $httpProvider.interceptors.push(['$q',
//        function ($q) {
//            return {
//                responseError: function (rejection) {
//                    console.log(rejection);
//                    switch (rejection.status) {
//                        case 400:
//                            return '400';
//                        case 404:
//                            return '404';
//                    }
//
//                    return $q.reject(rejection);
//                },
//                'response': function(response){
//                    console.log(response);
//                    return response;
//                }
//            };
//        }
//    ])
//}
//]);