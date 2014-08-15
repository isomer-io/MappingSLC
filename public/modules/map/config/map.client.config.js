'use strict';

// Configuring the Articles module
angular.module('map').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Map', 'map', 'dropdown', '/map(/create)?');
		//Menus.addSubMenuItem('topbar', 'map', 'map', 'maps');
//		Menus.addSubMenuItem('topbar', 'docs', 'New Doc', 'docs/create');
	}
]);