'use strict';

// Configuring the Articles module
angular.module('stories').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Stories', 'stories', 'dropdown', '/stories(/create)?');
		Menus.addSubMenuItem('topbar', 'stories', 'List Stories', 'stories');
		Menus.addSubMenuItem('topbar', 'stories', 'New Story', 'stories/create');
	}
]);