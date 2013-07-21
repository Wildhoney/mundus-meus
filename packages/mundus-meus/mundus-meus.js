/**
 * @module MundusMeus
 * @param {object} options
 * @constructor
 */
function MundusMeus(options) {

    // Configure all of the necessary options.
    this.options    = options;
    this.paths      = {
        geolocate: './../api/Geolocate/%@',
        search: './../api/Search/%@/%@'
    };

    // Memorise the content of the templates.
    this.templates = {};
    this.templates.GEOLOCATION  = options.elements.geolocation.records.innerHTML;
    this.templates.SEARCH       = options.elements.search.innerHTML;

    // Configure the onClick event.
    this.configureEvents();

    // Initialise the LeafletJS map.
    this.createMap();

}

/**
 * @module MundusMeus
 * @property prototype
 * @type {object}
 */
MundusMeus.prototype = {

    updateTemplate: function(templateName, objects) {

    },

    configureEvents: function() {

        var elements    = this.options.elements,
            button      = $(elements.button);

        var template    = this.templates.GEOLOCATION,
            url         = this.paths.geolocate,
            interpolate = this.interpolate,
            records     = elements.geolocation.records,
            record      = elements.geolocation.record,
            container   = elements.geolocation.container;

        button.on('click', function() {

            var geolocateUrl = interpolate(url, [$(elements.text).val()]);

            $(container).addClass('active');

            // Notify the view that we're loading the result set.
            var html = Mustache.render(template, { isLoading: true });
            records.innerHTML = html;

            $.getJSON(geolocateUrl, function(results) {

                var html = Mustache.render(template, { results: results, isLoading: false });
                records.innerHTML = html;

                var items = $(records).find(record);
                items.on('click', function(clicked) {
                    console.log(clicked);
                }.bind());

            });

        });

    },

    /**
     * @method createMap
     * @return {void}
     */
    createMap: function() {

        // Instantiate the map.
        var map = L.map(this.options.elements.map, {
            center: [51.505, -0.09],
            zoom: 13
        });

        // Insert the tile layer; can be changed by supplying the `tiles` attribute in the options.
        L.tileLayer(this.options.tiles || 'http://b.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/102960/256/{z}/{x}/{y}.png').addTo(map);

    },

    /**
     * @method interpolate
     * @param value {String}
     * @param formats {Array}
     * @return {string}
     */
    interpolate: function(value, formats) {

        var index  = 0;

        return value.replace(/%@([0-9]+)?/g, function(s, argIndex) {
            argIndex = (argIndex) ? parseInt(argIndex,0) - 1 : index++ ;
            s = formats[argIndex];
            return ((s === null) ? '(null)' : (s === undefined) ? '' : s).toString();
        });

    }

};