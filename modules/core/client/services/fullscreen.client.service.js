'use strict';

angular.module('core').service('FullScreenService', [,
    function() {

        this.fullScreen= function(){

            /**
             * Full-screen functionality
             */
            // Find the right method, call on correct element
            var launchFullscreen = function(element) {
                if(element.requestFullscreen) {
                    element.requestFullscreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            };

            // Launch fullscreen for browsers that support it
            //launchFullscreen(document.documentElement); // the whole page
            //launchFullscreen(document.getElementById("videoElement")); // any individual element

            // Whack fullscreen
            var exitFullscreen = function(element) {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            };

// Cancel fullscreen for browsers that support it!
//    exitFullscreen();


        };
    }
]);
