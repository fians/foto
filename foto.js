
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
    // https://github.com/dperini/ContentLoaded/blob/master/src/contentloaded.js
    function ready(win, fn) {

        var done = false, top = true,

        doc = win.document,
        root = doc.documentElement,
        modern = doc.addEventListener,

        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',

        init = function(e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function() {
            try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
            init('poll');
        };

        if (doc.readyState == 'complete') fn.call(win, 'lazy');
        else {
            if (!modern && root.doScroll) {
                try { top = !win.frameElement; } catch(e) { }
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }

    }

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
    ready(w, function() { 

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