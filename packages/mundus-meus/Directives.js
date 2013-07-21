/**
 * @directive map
 * @restrict E
 * @type {Function}
 * Container for the Leaflet map.
 */
app.directive('map', function() {

    return { restrict: 'E', link: function($scope, $element) {

        var mapElement = $element[0];

        // Instantiate the map.
        var map = L.map(mapElement, {
            center: [51.505, -0.09],
            zoom: 13
        });

        // Insert the tile layer; can be changed by supplying the `tiles` attribute in the options.
        L.tileLayer('http://b.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/102960/256/{z}/{x}/{y}.png').addTo(map);

    }}

});

/**
 * @directive geolocate-button
 * @restrict A
 * @type {Function}
 * Button that initialises the geolocation.
 */
app.directive('geolocateButton', function() {

    return { restrict: 'A', link: function($scope, $element) {
        $element.bind('click', function() {
            $scope.active = true;
            $scope.$apply();
        });
    }};

});

/**
 * @directive geolocate-text
 * @restrict A
 * @type {Function}
 * Search query for the geolocation.
 */
app.directive('geolocateText', function() {

    return { restrict: 'A', link: function($scope, $element) {
        $element.bind('keyup', function() {
            $scope.model.name = $element.context.value;
            $scope.$apply();
        });

    }};

});

app.directive('searchDisplay', ['$entityInitialise', function($entityInitialise) {

    return { restrict: 'A', link: function($scope, $element) {
        $element.bind('click', function() {
            $entityInitialise.open();
        });
    }}}

]);