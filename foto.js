
/*! 
 * Foto - v0.1.0 
 * https://github.com/fians/foto 
 * 
 * Copyright 2014 Alfiana E. Sibuea and other contributors 
 * Released under the MIT license 
 * https://github.com/fians/foto/blob/master/LICENSE 
 */ 

;(function(w) {
    'use strict';

    // DOM Ready function
    // https://github.com/addyosmani/jquery.parts/blob/master/jquery.documentReady.js
    var ready = (function() {

        // Use the correct document accordingly with window argument (sandbox)
        var document = window.document,
            DOMFinish = false,
            readyBound = false,
            callbackQueue = [];

        function registerOrRunCallback(callback) {
            if (typeof callback === 'function') {
                callbackQueue.push(callback);
            }
        }

        function DOMReadyCallback() {
            while(callbackQueue.length) {
                (callbackQueue.shift())();
            }
            registerOrRunCallback = function( callback ) {
                callback();
            };
        }

        // The ready event handler
        function DOMContentLoaded() {
            if (document.addEventListener) {
                document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
            } else {
                // we're here because readyState !== "loading" in oldIE
                // which is good enough for us to call the dom ready!
                document.detachEvent( "onreadystatechange", DOMContentLoaded );
            }
            DOMReady();
        }

        // Handle when the DOM is ready
        function DOMReady() {
            // Make sure that the DOM is not already loaded
            if ( !DOMFinish ) {
                // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                if ( !document.body ) {
                    return setTimeout( DOMReady, 1 );
                }
                // Remember that the DOM is ready
                DOMFinish = true;
                // If there are functions bound, to execute
                DOMReadyCallback();
                // Execute all of them
            }
        }

        function bindReady() {
            var toplevel = false;

            if ( readyBound ) {
                return;
            }
            readyBound = true;

            // Catch cases where $ is called after the
            // browser event has already occurred.
            if ( document.readyState !== "loading" ) {
                DOMReady();
            }

            // Mozilla, Opera and webkit nightlies currently support this event
            if ( document.addEventListener ) {
                // Use the handy event callback
                document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
                // A fallback to window.onload, that will always work
                window.addEventListener( "load", DOMContentLoaded, false );
                // If IE event model is used
            } else if ( document.attachEvent ) {
                // ensure firing before onload,
                // maybe late but safe also for iframes
                document.attachEvent( "onreadystatechange", DOMContentLoaded );
                // A fallback to window.onload, that will always work
                window.attachEvent( "onload", DOMContentLoaded );
                // If IE and not a frame
                // continually check to see if the document is ready
                try {
                    toplevel = window.frameElement == null;
                } catch (e) {}
                if ( document.documentElement.doScroll && toplevel ) {
                    doScrollCheck();
                }
            }
        }

        // The DOM ready check for Internet Explorer
        function doScrollCheck() {
            if (DOMFinish) {
                return;
            }
            try {
                // If IE is used, use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                document.documentElement.doScroll("left");
            } catch (error) {
                setTimeout( doScrollCheck, 1 );
                return;
            }
            // and execute any waiting functions
            DOMReady();
        }

        function ready(callback) {
            registerOrRunCallback(callback);
            bindReady();
        }

        return ready;

    })();

    /**
     * Extract ft-*-src attribute
     * to get it number value
     */
    function extract(raw) {

        var container = {};

        for (var a in raw) {
            if (raw.hasOwnProperty(a)) {

                var capture = a.match(/ft\-([\d]+)\-src/);

                if (capture) {
                    container[capture[1]] = raw[a];
                }

            }
        }

        return container;
    }

    function getAllAttributes(attrs) {

        var container = {};

        for (var a in attrs) {
            if (attrs.hasOwnProperty(a)) {
                if (typeof attrs[a] === 'object') {
                    container[attrs[a].name] = attrs[a].value;
                }
            }
        }

        return container;
    }

    /**
     * Filter and pick the ft-*-src attributes
     * and return the closest value based 
     * on window width
     */
    function pick(imgObj) {

        // Pick width
        var e = document.documentElement;
        var g = document.getElementsByTagName('body')[0];
        var width = w.innerWidth || e.clientWidth || g.clientWidth;

        var img = {
            width: 0,
            src: ''
        };

        for (var a in imgObj) {
            if (imgObj.hasOwnProperty(a)) {

                var key = Number(a);

                if (key <= width && key >= img.width) {
                    img.width = key;
                    img.src = imgObj[a];
                }
            }
        }

        return img.src;
    }

    /**
     * Initialize or set images based on ft-*-src
     */
    function init() {

        var container = {};
        var imgs = document.getElementsByTagName('img');

        for (var a = 0; a < imgs.length; a++) {

            // Pick source
            var rawAttr     = getAllAttributes(imgs[a].attributes);
            var container   = extract(rawAttr);
            var selectedSrc = pick(container);

            // Set to img element
            (function(el, src) {
                var image = new Image();
                image.onload = function() {
                    el.setAttribute('src', src);
                };
                image.src = src;
            })(imgs[a], selectedSrc);
        }

    }

    // Start!
    ready(function() { 

        init(); 

        // Attach resize event
        if (w.attachEvent) {
            w.attachEvent('onresize', init);
        }
        else if (w.addEventListener) {
            w.addEventListener('resize', init, true);
        }

    });

})(window);