'use strict';

// Configuring the Articles module
angular.module('maps').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Maps', 'maps', 'dropdown', '/maps(/create)?');
		Menus.addSubMenuItem('topbar', 'maps', 'List Maps', 'maps');
		Menus.addSubMenuItem('topbar', 'maps', 'New Map', 'maps/create');
	}
]);