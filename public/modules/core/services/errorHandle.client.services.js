/**
 * Created by steve on 2/18/15.
 */
angular.module('core')
.factory('ErrorHandleService', function($q) {
    return {
        // optional method
        request: function(config) {
            // do something on success
            return config;
        },

        // optional method
        requestError: function(rejection) {
            // do something on error
            if (canRecover(rejection)) {
                return responseOrNewPromise
            }
            return $q.reject(rejection);
        },



        // optional method
        response: function(response) {
            console.log(response);
            return response;
        },

        // optional method
        responseError: function(rejection) {
           console.log(rejection);
            if (canRecover(rejection)) {
                return responseOrNewPromise
            }
            return $q.reject(rejection);
        }
    };
});