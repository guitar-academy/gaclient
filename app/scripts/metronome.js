/*
 * This metronome is taken from https://github.com/cwilso/metronome
 * with modifications to make the metronome more modular and reusable.
 *
 */

function Metronome () {
}

Metronome.prototype.audioContext = null;
Metronome.prototype.isPlaying = false;      // Are we currently playing?
Metronome.prototype.current16thNote = 0;        // What note is currently last scheduled?
Metronome.prototype.tempo = 120.0;          // tempo (in beats per minute)
Metronome.prototype.lookahead = 25.0;       // How frequently to call scheduling function 
                            //(in milliseconds)
Metronome.prototype.scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
                            // This is calculated from lookahead, and overlaps 
                            // with next interval (in case the timer is late)
Metronome.prototype.nextNoteTime = 0.0;     // when the next note is due.
Metronome.prototype.noteResolution = 0;     // 0 == 16th, 1 == 8th, 2 == quarter note
Metronome.prototype.noteLength = 0.05;      // length of "beep" (in seconds)
Metronome.prototype.notesInQueue = [];      // the notes that have been put into the web audio,
                            // and may or may not have played yet. {note, time}
Metronome.prototype.timerWorker = null;     // The Web Worker used to fire timer messages

Metronome.prototype.nextNote = function() {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / this.tempo;    // Notice this picks up the CURRENT 
                                          // tempo value to calculate beat length.
    this.nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time

    this.current16thNote++;    // Advance the beat number, wrap to zero
    if (this.current16thNote == 16) {
        this.current16thNote = 0;
    }
}

Metronome.prototype.scheduleNote = function( beatNumber, time ) {
    // push the note on the queue, even if we're not playing.
    this.notesInQueue.push( { note: beatNumber, time: time } );

    if ( (this.noteResolution==1) && (beatNumber%2))
        return; // we're not playing non-8th 16th notes
    if ( (this.noteResolution==2) && (beatNumber%4))
        return; // we're not playing non-quarter 8th notes

    // create an oscillator
    var osc = this.audioContext.createOscillator();
    osc.connect( this.audioContext.destination );
    if (beatNumber % 16 === 0)    // beat 0 == low pitch
        osc.frequency.value = 880.0;
    else if (beatNumber % 4 === 0 )    // quarter notes = medium pitch
        osc.frequency.value = 440.0;
    else                        // other 16th notes = high pitch
        osc.frequency.value = 220.0;

    osc.start( time );
    osc.stop( time + this.noteLength );
}

Metronome.prototype.scheduler = function() {
    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.
    while (this.nextNoteTime < this.audioContext.currentTime + this.scheduleAheadTime ) {
        this.scheduleNote( this.current16thNote, this.nextNoteTime );
        this.nextNote();
    }
}

Metronome.prototype.play = function() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) { // start playing
        this.current16thNote = 0;
        this.nextNoteTime = this.audioContext.currentTime;
        this.timerWorker.postMessage("start");
        return "stop";
    } else {
        this.timerWorker.postMessage("stop");
        return "play";
    }
}

Metronome.prototype.init = function(){
    // NOTE: THIS RELIES ON THE MONKEYPATCH LIBRARY BEING LOADED FROM
    // Http://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js
    // TO WORK ON CURRENT CHROME!!  But this means our code can be properly
    // spec-compliant, and work on Chrome, Safari and Firefox.

    this.audioContext = new AudioContext();

    // if we wanted to load audio files, etc., this is where we should do it.

    this.timerWorker = new Worker("scripts/metronome-controller.js");
    var self = this;

    this.timerWorker.onmessage = function(e) {
        if (e.data == "tick") {
            // console.log("tick!");
            self.scheduler();
        }
        else
            console.log("message: " + e.data);
    };
    this.timerWorker.postMessage({"interval":this.lookahead});
}
