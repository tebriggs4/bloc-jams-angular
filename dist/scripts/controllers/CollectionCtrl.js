(function() {                           /* add a controller for the Collection view */
    function CollectionCtrl() {
        this.albums = [];
        for (var i=0; i < 12; i++) {    /* bind the data from the albumPicasso object to the Collection template */
            this.albums.push(angular.copy(albumPicasso)); /* angular.copy is a global function components on the angular object */
        }
    }
 
    angular
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
})();