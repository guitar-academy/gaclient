'use strict';

/**
 * @ngdoc overview
 * @name gaclientApp
 * @description
 * # gaclientApp
 *
 * Main module of the application.
 */
angular.module('gaclientApp', [
    'ngCookies',
    'ui.router',
]).config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('song', {
        url: '/song',
        templateUrl: "/views/song.html",
    }).state('home', {
        url: '',
        templateUrl: "views/main.html",
        controller: "MainCtrl",
    });
});
