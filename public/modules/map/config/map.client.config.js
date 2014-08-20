'use strict';

// Configuring the Articles module
angular.module('map').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Map', 'map', 'dropdown', '/map(/create)?');
<<<<<<< HEAD
		Menus.addSubMenuItem('topbar', 'map', 'Map', 'map');
=======
		//Menus.addSubMenuItem('topbar', 'map', 'map', 'maps');
>>>>>>> charles merge complete
//		Menus.addSubMenuItem('topbar', 'docs', 'New Doc', 'docs/create');
	}
]);