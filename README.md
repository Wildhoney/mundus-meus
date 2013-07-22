Mundus Meus 0.1.0
===========

Description
-----------

Mundus Meus allows you to plot the locations of <em>entities</em>. It then allows the end user to specify their location (with optional auto-detection), and it then maps places of interest close to them.

<img src="https://dl.dropboxusercontent.com/s/03uaar440ofoerf/screenshot-0.1.0-alpha.png" alt="Screenshot taken from the Tescos example" />

In the example we're using Tescos. If you specify your location, the application will notify you of Tescos within close proximity to you.

The <strong>REALLY</strong> good thing about Mundus Meus is that it's written for developers to extend! It's written in beautiful OOP &ndash; PHP5 and AngularJS, and therefore is crying out to be extended in any way a developer sees fit. However, for those wanting to get started quickly, all you need to do is clone the example and style as necessary.

API
-----------

Mundus Meus defines two API routes:

 * `api/Geolocate/Nottingham` &ndash; Discovers the latitude/longitude for <i>Nottingham</i>;
 * `api/Search/52.95385025/-1.1698803748747` &ndash; Searches for entities around the lat/long.

**Please note**: the aforementioned routes require `MOD_REWRITE` to be enabled &ndash; `AllowOverride` also needs to be set to `All` in order for the routes to resolve correctly.

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

Adding a Service
-----------

As you're probably not wanting to map Tescos stores, Mundus Meus allows you to add your very own services very easily. Please follow the step-by-step guide:

 * Create a new service class in `api/Service` &ndash; call it `Service_Halfords`;
 * Change the `$_map` property to map the properties from the API to `name`, `latitude`, `longitude`, et cetera...;
 * Modify the `API_URL` constant to the Halfords store location URL (database interface coming shortly);
 * Implement the `_parseData` hook which allows you to parse the idiosyncratic response from the API;
 * Open `Default.php` and change the `getService` method to the name of your new service &ndash; `Service_Halfords`;