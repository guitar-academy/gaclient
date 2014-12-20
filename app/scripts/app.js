var app = angular.module('indexApp', ['ui.bootstrap']);

app.directive('ganavbar', function() {
    return {
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        templateUrl: 'views/header.html'
    };
});

app.directive('gafooter', function(){
    // Runs during compile
    return {
        restrict: 'E',
        templateUrl: 'views/footer.html',
    };
});
