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
            templateUrl: '/templates/landing.html'
        })
        .state('album', {
            url: '/album',
            templateUrl: '/templates/album.html'
        })
        .state('collection', {
            url: '/collection',
            templateUrl: '/templates/collection.html'
        });
    }
 
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();