/**
 * @directive map
 * @restrict E
 * @type {Function}
 * Container for the Leaflet map.
 */
app.directive('map', function() {

    return { restrict: 'E', link: function linkFn($scope, $element) {

        var mapElement = $element[0];

        // Instantiate the map.
        var map = L.map(mapElement, { center: [51.505, -0.09], zoom: 13 });

        // Insert the tile layer; can be changed by supplying the `tiles` attribute in the options.
        L.tileLayer('http://b.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/102960/256/{z}/{x}/{y}.png').addTo(map);

        $scope.$on('positionUpdate', function(context, latitude, longitude) {

            // When we receive the 'positionUpdate' event, we'll move to the location.
            map.panTo(new L.LatLng(latitude, longitude));

        });

        $scope.$on('plotMarkers', function(context, markers) {

            markers.forEach(function(marker) {

                // Append all of the markers onto the Leaflet.js map.
                var icon = L.divIcon({className: 'marker-icon', size: [100, 100]});
                L.marker([marker.latitude, marker.longitude], {icon: icon}).addTo(map);

            });

        });

    }}
});

/**
 * @directive find-location
 * @restrict A
 * @type {Function}
 * Button that initialises the geolocation.
 */
app.directive('findLocation', function() {

    return { restrict: 'A', link: function linkFn($scope, $element) {
        $element.bind('click', function() {
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
app.directive('openLocationResults', ['$mundusMeus', function($mundusMeus) {

    return { restrict: 'A', link: function linkFn($scope, $element) {
        $element.bind('click', function() {
            $mundusMeus.openSearchResults();
        });
    }}}

]);