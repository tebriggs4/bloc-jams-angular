(function() {                           /* add a controller for the Album view */
    function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum(); /* update AlbumCtrl to use Fixtures service's getAlbum() method to get albumPicasso object */
        this.songPlayer = SongPlayer;
    }
 
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
            /* we add Fixtures to AlbumCtrl's array of dependencies.  Once injected, the service is available for use within */
            /* the controller.  We play music from the Album view, so inject the service into AlbumCtrl */
})();