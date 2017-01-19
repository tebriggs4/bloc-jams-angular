(function() {                           /* add a controller for the Collection view */
    function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(12);   /* update CollectionCtrl to use Fixtures service's getCollection() method */
                                                    /* to get array of albumPicasso objects */
    }
 
    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();