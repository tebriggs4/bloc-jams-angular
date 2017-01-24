(function() {
    function SongPlayer($rootScope, Fixtures) { /* SongPlayer service has 2 private attributes: currentAlbum & currentBuzzObject; 3 */                        /* private functions: setSong, playSong & getSongIndex; 2 public methods: SongPlayer.play & SongPlayer.pause, */
                       /* and 2 public attributes: currentSong & currentTime, inject the Fixtures service into the SongPlayer service */
        var SongPlayer = {};    /* we create a variable and set it to an empty object. The service returns */
                                /* this object, making its properties and methods public to the rest of the application */
        /**
        * @desc Store album information
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();       /* use the getAlbum method to store the album information */
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
                SongPlayer.currentSong.playing = null;              /* boolean variable, if song is playing */
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {     /* set a new Buzz sound object */
                formats: ['mp3'],
                preload: true
            });
            
            /* To update the song's playback progress from anywhere, we'll add a  $rootScope.$apply event in the SongPlayer */
            /* service. This creates a custom event that other parts of the Angular application can "listen" to. This will be our */
            /* first custom event. Add the $apply to the SongPlayer.setSong method so that it starts "applying" the time update */
            /* once we know which song to play. */
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                    SongPlayer.currentVolume = currentBuzzObject.getVolume();
                });
            });
 
            SongPlayer.currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc Plays current song
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();                               /* play the new Buzz sound object */
            song.playing = true;                                    /* boolean variable, if song is playing */
        };
        /**
        * @function getSongIndex
        * @desc Get the index of a song
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        /**
        * @function stopSong
        * @desc Stop playing the current song and set playing property of song object to null
        * @param {Object} song
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;  /* change the private attribute currentSong into a public attribute named */
                                        /* SongPlayer.currentSong so that we can use it within the player bar */
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        /**
        * @desc Current volume of currently playing song
        * @type {Number}
        */
        SongPlayer.currentVolume = null;
        /**
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            /* We use || to tell the function: assign (1) the value of song or (2) the value of SongPlayer.currentSong to the song */
            /* variable. The first condition occurs when we call the methods from the Album view's song rows, and the second */
            /* condition occurs when we call the methods from the player bar. */
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);                                      /* set the newly chosen song object as the currentSong */
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        /**
        * @function pause
        * @desc Pause current song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            /* We use || to tell the function: assign (1) the value of song or (2) the value of SongPlayer.currentSong to the song */
            /* variable. The first condition occurs when we call the methods from the Album view's song rows, and the second */
            /* condition occurs when we call the methods from the player bar. */
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
        * @function previous
        * @desc Go to the previous song, update song index
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
        
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        * @function next
        * @desc Go to the next song, update song index
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
        
            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        /* The setCurrentTime method checks if there is a current Buzz object, and, if so, uses the Buzz library's */
        /* setTime method to set the playback position in seconds. */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        /**
        * @function setVolume
        * @desc Set volume of currently playing song
        * @param {Number} time
        */
        /* The setVolume method checks if there is a current Buzz object, and, if so, uses the Buzz library's */
        /* setTime method to set the playback position in seconds. */
        SongPlayer.setCurrentVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };
        
        return SongPlayer;
    }
    
 
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]); /* register a SongPlayer service using the Factory recipe */
                                                                        /* include the Fixtures factory at the bottom of the file */
        /* In Angular, one way to scope a variable to all parts of an application is to use the  $rootScope service. Every Angular */
        /* application has just one $rootScope, from which all other scopes inherit. Any Angular component, then, can access */
        /* $rootScope variables, events, and functions. */
})();