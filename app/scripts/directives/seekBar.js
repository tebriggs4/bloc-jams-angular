(function() {                       /* register a seekBar directive */
    /* For directives, the callback function (seekBar) is a factory function. It returns an object that */
    /* describes the directive's behavior to Angular's HTML compiler.  We've named the directive seekBar, which means Angular */
    /* will look for seek-bar in the HTML and call this directive when it finds that markup.  */
    function seekBar($document) {                               /* must inject $document as a dependency */
        var calculatePercent = function(seekBar, event) {       /* Calculates the horizontal percent along the seek bar */
                                                                /* where the event (passed in from the view as $event) occurred. */
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };
        return {
            templateUrl: '/templates/directives/seek_bar.html',  /* specifies a URL from which the directive will load a template */
                            /* The templateUrl option specifies the path to the HTML template that the directive will use. */
            replace: true,  /* Specifies what the template should replace. If true, the template replaces the directive's */
                            /* If false, the template replaces the contents of the directive's element. */
                            /* replace: true instructs Angular to completely replace the <seek-bar> element with the directive's */
                            /* HTML template rather than insert the HTML between the <seek-bar></seek-bar> tags. */
            restrict: 'E',  /* Restricts the directive to a specific declaration style: element E, attribute A, class C, and */
                            /* comment M. If omitted, the defaults (E and A) are used. */
                            /* restrict: 'E' instructs Angular to treat this directive as an element. For example, Angular will run */
                            /* the code if it finds <seek-bar> in the HTML, but not if it finds <div seek-bar>. */
            scope: { },     /* specifies that a new scope be created for the directive */
                            /* Declaring an empty scope property ensures that a new scope will exist solely for the directive */
                            /* (referred to as isolate-scope). An isolate-scope allows us to bind functions from the directive's */
                            /* view to its scope. */
            link: function(scope, element, attributes) {    /* Responsible for registering DOM listeners and updating the DOM. */
                            /* This is where we put most of the directive logic. The link function is automatically generated and */
                            /* scoped to the element defining the directive. Think of it as a function that executes when the directive */
                            /* is instantiated in the view. This is where all logic related to DOM manipulation will go. */
                scope.value = 0;    /* seekBar's HTML template can access the attributes & methods of the directive's scope object */
                                    /* Holds the value of the seek bar, such as the currently playing song time or the current volume. */
                                    /* Default value is 0. */
                scope.max = 100;    /* Holds the maximum value of the song and volume seek bars. Default value is 100. */
                
                var seekBar = $(element);   /* Holds the element that matches the directive (<seek-bar>) as a jQuery object */
                                            /* so we can call jQuery methods on it. */
 
                var percentString = function () {   /* A function that calculates a percent based on the value and maximum value */
                                                    /* of a seek bar. */
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
 
                scope.fillStyle = function() {      /* Returns the width of the seek bar fill element based on the calculated percent. */
                    return {width: percentString()};
                };
                
                scope.thumbStyle = function() {      /* updates the position of the seek bar thumb */
                    return {left: percentString()};
                };
                
                scope.onClickSeekBar = function(event) {    /* Updates the seek bar value based on the seek bar's width and */
                                                            /* the location of the user's click on the seek bar. */
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                
                scope.trackThumb = function() {     /* Similar to scope.onClickSeekBar, but uses $apply to constantly apply */
                                                    /* the change in value of scope.value as the user drags the seek bar thumb. */
                    $document.bind('mousemove.thumb', function(event) { /* We use $document as we did in the Foundation, but with */
                                                                /* Angular, $document must be injected as a dependency to use it. */
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() {
                            scope.value = percent * scope.max;
                        });
                    });
 
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }
 
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();