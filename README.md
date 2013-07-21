Mundus Meus 0.1.0
===========

API
-----------

Mundus Meus defines two API routes:

 * `api/Geolocate/Nottingham` &ndash; Discovers the latitude/longitude for <i>Nottingham</i>;
 * `api/Search/52.95385025/-1.1698803748747` &ndash; Searches for entities around the lat/long.

**Please note**: the aforementioned routes require `MOD_REWRITE` to be enabled &ndash; `AllowOverride` also needs to be set to `All` in order for the routes to resolve correctly. If you don't wish to use `MOD_REWRITE`, please refer to the `.htaccess`. file for the original routes.

Technologies
-----------

<img src="http://angularjs.org/img/AngularJS-large.png" alt="Using Angular.js" />

 * <em><a href="http://angularjs.org/" target="_blank">Angular.js</a></em>: Utilised for the front-end example and API;
 * <em><a href="http://nominatim.openstreetmap.org/" target="_blank">Nominatim API</a></em>: For resolving places to latitude/longitude values;
 * <em><a href="https://github.com/jenssegers/php-router" target="_blank">PHP Router</a></em>: Laravel inspired PHP router;
 * <em><a href="http://lesscss.org/" target="_blank">LESS</a></em>: Preprocessor for more organised stylesheets;
 * <em><a href="http://www.leafletjs.com/" target="_blank">Leaflet.js</a></em>: For all of the mapping functionality;
 * <em><a href="http://www.gruntjs.com/" target="_blank">Grunt.js</a></em>: Build process for the JavaScript/LESS/HTML;

Etymology
-----------

You're probably wondering, so we'll spill the beans! <i>Mundus Meus</i> is Latin for <i>My World</i>. We considered calling it <i>Meus Mundus Parvus</i> (<i>My Little World</i>), but frankly, that's a little too long for comfort.