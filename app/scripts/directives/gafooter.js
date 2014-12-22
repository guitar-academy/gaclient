'use strict';

/**
 * @ngdoc directive
 * @name gaclientApp.directive:gafooter
 * @description
 * # gafooter
 */
angular.module('gaclientApp').directive('gafooter', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/footer.html'
    };
});
