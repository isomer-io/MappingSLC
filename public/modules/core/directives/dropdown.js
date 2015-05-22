angular.module('core').directive('dropdown', function($rootScope) {

return {
	restrict: "E",
	templateUrl: "/modules/core/directives/views/dropdown.html",
	scope: {
		placeholder: "@",
		list: "=",
		selected: "=",
		property: "@"
	},
	link: function($scope) {
		//scope.listVisible = false;
		//scope.isPlaceholder = true;
		//
		//scope.select = function(item) {
		//	scope.isPlaceholder = false;
		//	scope.selected = item;
		//};
		//
		//scope.isSelected = function(item) {
		//	return item[scope.property] === scope.selected[scope.property];
		//};
		//
		//scope.show = function() {
		//	scope.listVisible = true;
		//};
		//
		//$rootScope.$on("documentClicked", function(inner, target) {
		//	console.log($(target[0]).is(".dropdown-display.clicked") || $(target[0]).parents(".dropdown-display.clicked").length > 0);
		//	if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
		//		scope.$apply(function() {
		//			scope.listVisible = false;
		//		});
		//});
		//
		//scope.$watch("selected", function(value) {
		//	scope.isPlaceholder = scope.selected[scope.property] === undefined;
		//	scope.display = scope.selected[scope.property];
		//});


		$scope.colorsArray = ["Red", "Green", "Blue"];

		$scope.peopleArray = [
			{id: "1", firstName: "John", lastName: "Doe", sex: "M"},
			{id: "2", firstName: "Alice", lastName: "White", sex: "F"},
			{id: "3", firstName: "Michael", lastName: "Green", sex: "M"}
		];

		$scope.colorsObject = {
			"R": "Red",
			"G": "Green",
			"B": "Blue"
		};

		$scope.peopleObject = {
			"1": {firstName: "John", lastName: "Doe", sex: "M"},
			"2": {firstName: "Alice", lastName: "White", sex: "F"},
			"3": {firstName: "Michael", lastName: "Green", sex: "M"}
		};

		$scope.getPersonFullName = function (person)
		{
			return person.firstName + " " + person.lastName;
		};

		$scope.getPersonIdAndFullName = function (person)
		{
			return "(" + person.id + ") " + person.firstName + " " + person.lastName;
		};

		$scope.selectPersonById = function (id)
		{
			$scope.peopleArrayValue5 = {id: id};
		};

	}
}

});