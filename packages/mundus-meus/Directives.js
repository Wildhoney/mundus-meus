/**
 * @directive map
 * @restrict E
 * @type {Function}
 * Container for the Leaflet map.
 */
app.directive('map', ['$mundusMeus', function map($mundusMeus) {

    /**
     * @property allMarkers
     * @type {Array}
     * Holds all of the markers currently being displayed on the map.
     * @private
     */
    var allMarkers = [];

    return { restrict: 'E', link: function linkFn($scope, $element) {

        var mapElement = $element[0];

        // Instantiate the map.
        var map = L.map(mapElement, { center: [51.505, -0.09], zoom: 13 });

        var tileUrl = mapElement.getAttribute('data-tiles') ||
                      'http://mt1.google.com/vt/lyrs=m@110&hl=pl&x={x}&y={y}&z={z}';

        // Insert the tile layer; can be changed by supplying the `tiles` attribute in the options.
        L.tileLayer(tileUrl).addTo(map);

        /**
         * @event highlightMarker
         * Highlights the active Leaflet.js marker on the map.
         * @return {void}
         */
        $scope.$on('highlightMarker', function(context, model) {

            allMarkers.forEach(function(item) {

                var classList = item.marker._icon.classList;

                if (item.model === model) {
                    classList.add('active');
                    return;
                }

                classList.remove('active');

            });

        });

        /**
         * @event positionUpdate
         * Move the Leaflet.js map to the desired location as denoted by the lat/long.
         * @return {void}
         */
        $scope.$on('positionUpdate', function(context, latitude, longitude) {

            // When we receive the 'positionUpdate' event, we'll move to the location.
            map.panTo(new L.LatLng(latitude, longitude));

        });

        /**
         * @event plotMarkers
         * @param context {Object}
         * @param models {Array}
         * @param homeLocation {Object}
         * Plot the markers on the Leaflet.js map
         * @return {void}
         */
        $scope.$on('plotMarkers', function(context, models, homeLocation) {

            var latLongBounds = [];

            // Clear all of the markers.
            allMarkers.forEach(function(item) {
                map.removeLayer(item.marker);
            });

            // $mundusMeus.highlightMarker();
            allMarkers.length = 0;

            // Iterate over all of the markers for this particular location.
            models.forEach(function(model) {

                // Append all of the markers onto the Leaflet.js map.
                var icon    = L.divIcon({className: 'marker-icon', size: [100, 100]}),
                    marker  = L.marker([model.latitude, model.longitude], {icon: icon}).addTo(map);

                marker.on('click', function() {
                    // Emit the `markerSelected` event when the user clicks on any of the markers.
                    $scope.$emit('markerSelected', model);
                });

                // Keep a track of the markers in the collection.
                allMarkers.push({ model: model, marker: marker });

                // Append each lat/long pair to calculate the bounds.
                latLongBounds.push([model.latitude, model.longitude]);

            });

            // Add the home marker.

            // Append all of the markers onto the Leaflet.js map.
            var icon    = L.divIcon({className: 'marker-icon is-home', size: [100, 100]}),
                marker  = L.marker([homeLocation.latitude, homeLocation.longitude], {icon: icon}).addTo(map);

            allMarkers.push({ model: homeLocation, marker: marker });
            latLongBounds.push([homeLocation.latitude, homeLocation.longitude]);

            if (latLongBounds.length > 0) {
                map.fitBounds([latLongBounds]);
            }

        });

    }};

}]);

/**
 * @directive find-location
 * @restrict A
 * @type {Function}
 * Button that initialises the geolocation.
 */
app.directive('findLocation', function findLocation() {

    return { restrict: 'A', link: function linkFn($scope, $element) {
        $element.bind('click', function click() {
            $scope.active = true;
            $scope.$apply();
        });
    }};

});

/**
 * @directive open-location-results
 * @restrict A
 * @type {Function}
 * Opens the results that relate to the region the user clicked on.
 */
app.directive('openLocationResults', ['$mundusMeus', function openLocationResults($mundusMeus) {

    return { restrict: 'A', link: function linkFn($scope, $element) {
        $element.bind('click', function click() {
            $mundusMeus.openSearchResults();
        });
    }};

}]);