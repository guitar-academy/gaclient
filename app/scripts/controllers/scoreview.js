'use strict';

/**
 * @ngdoc function
 * @name gaclientApp.controller:ScoreviewCtrl
 * @description
 * # ScoreviewCtrl
 * Controller of the gaclientApp
 */
angular.module('gaclientApp').controller('ScoreviewCtrl', function ($scope) {
    var UNPRESSED = 'btn-default';
    var PRESSED = 'btn-primary';
    this.score = {
        'htmlClass' : UNPRESSED
    };

    this.tab = {
        'htmlClass' : UNPRESSED
    };

    this.toggle = function (button) {
        // TODO(digawp): toggle the score/tab view too (currently not available)
        if (button.htmlClass == UNPRESSED) {
            button.htmlClass = PRESSED;
        } else {
            button.htmlClass = UNPRESSED;
        }
    };
});
