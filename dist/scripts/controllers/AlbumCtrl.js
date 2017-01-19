(function() {                           /* add a controller for the Album view */
    function AlbumCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum(); /* update AlbumCtrl to use Fixtures service's getAlbum() method to get albumPicasso object */
    }
 
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]); /* we add Fixtures to AlbumCtrl's array of dependencies.  Once */
                                                           /* injected, the service is available for use within the controller. */
})();