(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
        .html5Mode({
            enabled: true,          /* true: hashbang URLs are disabled, meaning users will see clean URLs without the hashbang */
            requireBase: false      /* unrelated to the hashbang issue, but is one way to avoid a common $location error */
        });
        /* need to know how to configure at least four aspects of a state: its name, URL route, controller, and template */
        /* $stateProvider calls .state(), which takes two arguments: stateName and stateConfig, stateName is a unique */
        /* string that identifies a state, stateConfig is an object that defines specific properties of the state */
        $stateProvider
        .state('landing', {         /* create a state named landing and add an accompanying URL */
            url: '/',
            controller: 'LandingCtrl as landing',   /* add controller property to the landing state */
            templateUrl: '/templates/landing.html'
        })
        .state('album', {
            url: '/album',
            controller: 'AlbumCtrl as album',           /* register the AlbumCtrl to the album state */
            templateUrl: '/templates/album.html'
        })
        .state('collection', {
            url: '/collection',
            controller: 'CollectionCtrl as collection', /* register the CollectionCtrl to the collection state */
            templateUrl: '/templates/collection.html'
        });
    }
 
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();