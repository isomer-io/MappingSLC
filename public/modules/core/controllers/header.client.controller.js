//'use strict';
//
//angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
//	function($scope, Authentication) {
//		$scope.authentication = Authentication;
//
//
//        $scope._init = function() {
//            this.trigger = this.el.querySelector( 'a.gn-icon-menu' );
//            this.menu = this.el.querySelector( 'nav.gn-menu-wrapper' );
//            this.isMenuOpen = false;
//            this.eventtype = mobilecheck() ? 'touchstart' : 'click';
//            this._initEvents();
//
//            var self = this;
//            this.bodyClickFn = function() {
//                self._closeMenu();
//                this.removeEventListener( self.eventtype, self.bodyClickFn );
//            };
//        };
//
//
//        $scope._initEvents = function() {
//            var self = this;
//
//            if( !mobilecheck() ) {
//                this.trigger.addEventListener( 'mouseover', function(ev) { self._openIconMenu(); } );
//                this.trigger.addEventListener( 'mouseout', function(ev) { self._closeIconMenu(); } );
//
//                this.menu.addEventListener( 'mouseover', function(ev) {
//                    self._openMenu();
//                    document.addEventListener( self.eventtype, self.bodyClickFn );
//                } );
//            }
//            this.trigger.addEventListener( this.eventtype, function( ev ) {
//                ev.stopPropagation();
//                ev.preventDefault();
//                if( self.isMenuOpen ) {
//                    self._closeMenu();
//                    document.removeEventListener( self.eventtype, self.bodyClickFn );
//                }
//                else {
//                    self._openMenu();
//                    document.addEventListener( self.eventtype, self.bodyClickFn );
//                }
//            } );
//            this.menu.addEventListener( this.eventtype, function(ev) { ev.stopPropagation(); } );
//        };
//
//        $scope._openIconMenu = function() {
//            classie.add( this.menu, 'gn-open-part' );
//        };
//
//        $scope._closeIconMenu = function() {
//            classie.remove( this.menu, 'gn-open-part' );
//        };
//
//        $scope._openMenu = function() {
//            if( this.isMenuOpen ) return;
//            classie.add( this.trigger, 'gn-selected' );
//            this.isMenuOpen = true;
//            classie.add( this.menu, 'gn-open-all' );
//            this._closeIconMenu();
//        };
//
//        $scope._closeMenu = function() {
//            if( !this.isMenuOpen ) return;
//            classie.remove( this.trigger, 'gn-selected' );
//            this.isMenuOpen = false;
//            classie.remove( this.menu, 'gn-open-all' );
//            this._closeIconMenu();
//        }
//
//    }
//]);