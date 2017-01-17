(function() {
    function LandingCtrl() { /* object constructors are capitalized by convention to distinguish them from other functions */
        this.heroTitle = "Turn the Music Up!";
    }
 
    /* The .controller() method has two parameters: name of the controller and */
    /* a callback function or an array that injects dependencies, with a callback function as the last item in the array */
    /* The second argument is the callback function that executes when the controller is initialized. */
    /* We must call .controller() on an Angular module. Note that the  .module() call does not have the second argument, */
    /* the array of dependencies. Because we've set the dependencies in app.js, we only need to retrieve */
    /* the already-defined module. */
    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();