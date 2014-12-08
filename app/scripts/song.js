(function() {
	var app = angular.module('songApp', ['indexApp']);

	var UNPRESSED = 'btn-default';
	var PRESSED = 'btn-primary';

	app.controller('ScoreViewController', function(){
		this.score = {
			'htmlClass'	: UNPRESSED
		};

		this.tab = {
			'htmlClass'	: UNPRESSED
		};

		this.toggle = function (button) {
			// TODO(digawp): toggle the score/tab view too (currently not available)
			if (button.htmlClass == UNPRESSED) {
				button.htmlClass = PRESSED;
			} else {
				button.htmlClass = UNPRESSED;
			}
		};
	});  // ScoreViewController

	app.controller('SideBarController', ['', function(){
	}]);

	app.controller('MetronomeController', function(){
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

})();
