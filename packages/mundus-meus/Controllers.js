/**
 * @class GeolocationCtrl
 * @param $scope {Object}
 * @param $http {Function}
 * @param $interpolate {Function}
 * @param $timeout {Function}
 * @param $mundusMeus {Object}
 * @constructor
 */
app.controller('GeolocationCtrl', ['$scope', '$http', '$interpolate', '$timeout', '$mundusMeus',
    function GeolocationCtrl($scope, $http, $interpolate, $timeout, $mundusMeus) {

        var URL_GEOLOCATE       = './../api/Geolocate/{{location}}';

        $scope.results          = [];
        $scope.active           = false;
        $scope.location         = null;
        $scope.detectionAllowed = (navigator.geolocation) ? true : false;
        $scope.radii            = [
            { name: '1 mile', value: 1 },
            { name: '2 miles', value: 2 },
            { name: '5 miles', value: 5 },
            { name: '10 miles', value: 10 },
            { name: '25 miles', value: 25 }
        ];
        $scope.radius           = $scope.radii[3];

        /**
         * @method setRadius
         * @param radius {Number}
         * @return {void}
         */
        $scope.setRadius = function setRadius(radius) {
            $mundusMeus.setRadius(radius.value);
        };

        /**
         * @method setGeolocation
         * @param data {Object}
         * @return {void}
         */
        $scope.setGeolocation = function setGeolocation(data) {
            $mundusMeus.setGeolocation(data);
            $mundusMeus.toLocation(data.latitude, data.longitude);
        };

        /**
         * @method getGeolocation
         * @param name {String}
         * @return {void}
         */
        $scope.getGeolocation = function getGeolocation(name) {

            $scope.noResults = false;

            var getResults = function getResults() {

                var url = $scope.$eval($interpolate(URL_GEOLOCATE));

                $http.get(url).success(function success(data) {

                    if (data.length === 0) {
                        $scope.noResults = true;
                        return;
                    }

                    $scope.results = data;

                    // Detect if there's only one available location.
                    if ($scope.results.length === 1) {

                        // If there is only one result, then we'll jump to the location immediately, and
                        // find the results within close proximity.
                        $scope.setGeolocation($scope.results[0]);

                        $timeout(function timeout() {
                            // Open the search results after 800 milliseconds.
                            $mundusMeus.openSearchResults();
                        }, 800);

                    }

                });

            };

            if (typeof name === 'undefined') {

                // If we haven't set a name then we'll use the browser to find their location.
                navigator.geolocation.getCurrentPosition(function getCurrentPosition(position) {

                    // Set the location as the determined coordinates.
                    $scope.location = position.coords.latitude + ',' + position.coords.longitude;
                    $scope.$apply();

                    getResults();

                });

                return;
            }

            $scope.location = name;
            getResults();

        };

    }]
);

/**
 * @class SearchCtrl
 * @param $scope {Object}
 * @param $http {Function}
 * @param $interpolate {Function}
 * @param $mundusMeus {Object}
 * @constructor
 */
app.controller('SearchCtrl', ['$scope', '$http', '$interpolate', '$mundusMeus',
    function SearchCtrl($scope, $http, $interpolate, $mundusMeus) {

        var URL_SEARCH  = './../api/Search/{{position.latitude}}/{{position.longitude}}/{{radius}}';

        $scope.active   = false;
        $scope.results  = [];
        $scope.radius   = null;
        $scope.model    = {};
        $scope.position = { latitude: null, longitude: null };

        /**
         * @method isActive
         * @param model {Object}
         * @return {Boolean}
         */
        $scope.isActive = function isActive(model) {
            return ($scope.model === model);
        };

        /**
         * @method findMarker
         * @param model {Object}
         * @return {void}
         */
        $scope.findMarker = function findMarker(model) {
            $scope.model = model;
            $mundusMeus.highlightMarker(model);
            $mundusMeus.toLocation(model.latitude, model.longitude);
        };

        /**
         * @event radiusUpdated
         * @param context {Object}
         * @param radius {Number}
         * @return {void}
         */
        $scope.$on('radiusUpdated', function radiusUpdated(context, radius) {
            $scope.radius = radius;
        });

        /**
         * @event locationUpdated
         * @param context {Object}
         * @param data {Object}
         * @return {void}
         */
        $scope.$on('locationUpdated', function locationUpdated(context, data) {

            $scope.position.latitude    = data.latitude;
            $scope.position.longitude   = data.longitude;
            $scope.noResults            = false;
            var url                     = $scope.$eval($interpolate(URL_SEARCH));

            $http.get(url).success(function(data) {

                if (data.length === 0) {
                    $scope.noResults = true;
                }

                $scope.results = data;
                $scope.display = true;
                $mundusMeus.plotMarkers(data);

            });

        });

        /**
         * @event displaySearchResults
         * @return {void}
         */
        $scope.$on('displaySearchResults', function displaySearchResults() {
            $scope.active = true;
        });

    }]
);

/**
 * @class MapCtrl
 * @param $scope {Object}
 * @param $mundusMeus {Object}
 * @constructor
 */
app.controller('MapCtrl', ['$scope', '$mundusMeus',
    function MapCtrl() {

    }]
);