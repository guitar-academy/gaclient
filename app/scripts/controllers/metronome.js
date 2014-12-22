'use strict';

/**
 * @ngdoc function
 * @name gaclientApp.controller:MetronomeCtrl
 * @description
 * # MetronomeCtrl
 * Controller of the gaclientApp
 */
angular.module('gaclientApp').controller('MetronomeCtrl', function ($scope) {
    this.metronome = new Metronome();
    this.metronome.init(); // initialize metronome
    this.button = 'play';

    this.decrementTempo = function() {
        this.metronome.tempo--;
    };

    this.incrementTempo = function() {
        this.metronome.tempo++;
    }

    this.play = function() {
        this.button = this.metronome.play();
    }
});
