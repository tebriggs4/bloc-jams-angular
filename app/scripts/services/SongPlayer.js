(function() {
    function SongPlayer() {     /* SongPlayer service contains 2 private attributes: currentSong & currentBuzzObject; */
                                /* private function: setSong; 2 public methods: SongPlayer.play & SongPlayer.pause  */
        var SongPlayer = {};    /* we create a variable and set it to an empty object. The service returns */
                                /* this object, making its properties and methods public to the rest of the application */
        var currentSong = null;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();                           /* stop the currently playing song, if there is one */
                currentSong.playing = null;                         /* boolean variable, if song is playing */
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {     /* set a new Buzz sound object */
                formats: ['mp3'],
                preload: true
        });
 
        currentSong = song;
        };
        
        SongPlayer.play = function(song) {  /* add a play method to the SongPlayer service so that we can play a song */
            if (currentSong !== song) {
                setSong(song);                                      /* set the newly chosen song object as the currentSong */
                currentBuzzObject.play();                           /* play the new Buzz sound object */
                song.playing = true;                                /* boolean variable, if song is playing */
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();                       /* play song if it had previously been paused */
                    song.playing = true;                            /* boolean variable, if song is playing */
                }
            }
        };
        
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);     /* register a SongPlayer service using the Factory recipe */
})();