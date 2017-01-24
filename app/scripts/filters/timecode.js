(function() {
    /* Filter functions must return another function which takes at least one argument, the input of the filter – in this case, */
    /* our input is seconds. We'll take the number of seconds and convert it to a time-readable format. */
    function timecode() {
        return function(seconds) {
            var seconds = Number.parseFloat(seconds);
            if (Number.isNaN(seconds)) {                /* If seconds is not a number, then we return "-:--" to the view. */
                return '-:--';
            }
            var wholeSeconds = Math.floor(seconds);
            var minutes = Math.floor(wholeSeconds / 60);
            var remainingSeconds = wholeSeconds % 60;
 
            var output = minutes + ':';
 
            if (remainingSeconds < 10) {
                output += '0';   
            }
 
            output += remainingSeconds;
 
            return output;
        };
    }
 
    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();