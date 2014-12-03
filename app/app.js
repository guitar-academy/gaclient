var app = angular.module('indexApp', [ ]);

app.directive('ganavbar', function() {
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'layout/header.html'
	};
});