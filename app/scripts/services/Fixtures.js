(function() {
    function Fixtures() {               /* we'll use this service to pull the album data into our application */
        var Fixtures = {};              /* we declare a variable and set it to an empty object */
        /* Example Album - in real world would pull this from a database, create JavaScript objects to represent albums */
        var albumPicasso = {
            title: 'The Colors',
            artist: 'Pablo Picasso',
            label: 'Cubism',
            year: '1881',
            albumArtUrl: '/assets/images/album_covers/01.png',
            /* Add an audioUrl property to each song in the songs array of albumPicasso, and set the value */
            /* to the corresponding path of the mp3.  Note that we don't add the .mp3 extension to the end of */
            /* the audio files. We'll specify the file type when we use the files with Buzz. */
            songs: [
                /* song duration for each of our album tracks in seconds */
                { title: 'Blue', duration: 161.71, audioUrl: '/assets/music/blue' },
                { title: 'Green', duration: 103.96, audioUrl: '/assets/music/green' },
                { title: 'Red', duration: 268.45, audioUrl: '/assets/music/red' },
                { title: 'Pink', duration: 153.14, audioUrl: '/assets/music/pink' },
                { title: 'Magenta', duration: 374.22, audioUrl: '/assets/music/magenta' }
            ]
        };
 
        /* Another Example Album */
        var albumMarconi = {
            title: 'The Telephone',
            artist: 'Guglielmo Marconi',
            label: 'EM',
            year: '1909',
            albumArtUrl: '/assets/images/album_covers/20.png',
            songs: [
                { title: 'Hello, Operator?', duration: '1:01' },
                { title: 'Ring, ring, ring', duration: '5:01' },
                { title: 'Fits in your pocket', duration: '3:21' },
                { title: 'Can you hear me now?', duration: '3:14' },
                { title: 'Wrong phone number', duration: '2:15' }
            ]
        };
        Fixtures.getAlbum = function() {                        /* add a public getAlbum method to the service */
            return albumPicasso;
        };
        
        Fixtures.getCollection = function(numberOfAlbums) {     /* add a public getCollection method to the service */
            var albums = [];
            for (var i=0; i < numberOfAlbums; i++) {    /* bind the data from the albumPicasso object to the Collection template */
                albums.push(Fixtures.getAlbum());       /* angular.copy is a global function components on the angular object */
            }
            return albums;
        };
        
        return Fixtures;                /* factory will return this object and make its properties and methods available */
                                        /* to other parts of our Angular application */
    }
 
    angular
        .module('blocJams')
        .factory('Fixtures', Fixtures); /* register a Fixtures service using the Factory recipe */
})();