'use strict';

/**
 * @ngdoc directive
 * @name gaclientApp.directive:ganavbar
 * @description
 * # ganavbar
 */
angular.module('gaclientApp').directive('ganavbar', function () {
    return {
        restrict: 'E',
        templateUrl: 'views/header.html'
    };
});
