(function() {                           /* add a controller for the Album view */
    function AlbumCtrl() {
        this.albumData = angular.copy(albumPicasso);
    }
 
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();