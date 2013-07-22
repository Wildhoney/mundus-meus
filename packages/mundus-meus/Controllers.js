/**
 * @class GeolocationCtrl
 * @param $scope {Object}
 * @param $http {Function}
 * @param $interpolate {Function}
 * @param $timeout {Function}
 * @param $mundusMeus {Object}
 * @constructor
 */
function GeolocationCtrl($scope, $http, $interpolate, $timeout, $mundusMeus) {

    var URL_GEOLOCATE       = './../api/Geolocate/{{location}}';

    $scope.results          = [];
    $scope.active           = false;
    $scope.location         = null;
    $scope.detectionAllowed = (navigator.geolocation) ? true : false;

    /**
     * @method setGeolocation
     * @param data {object}
     * @return {void}
     */
    $scope.setGeolocation = function(data) {
        $mundusMeus.setGeolocation(data);
        $mundusMeus.toLocation(data.latitude, data.longitude);
    };

    /**
     * @method getGeolocation
     * @param name {String}
     * @return {void}
     */
    $scope.getGeolocation = function(name) {

        var getResults = function() {

            var url = $scope.$eval($interpolate(URL_GEOLOCATE));

            $http.get(url).success(function(data) {

                $scope.results = data;

                // Detect if there's only one available location.
                if ($scope.results.length === 1) {

                    // If there is only one result, then we'll jump to the location immediately, and
                    // find the results within close proximity.
                    $scope.setGeolocation($scope.results[0]);

                    $timeout(function() {
                        // Open the search results after 800 milliseconds.
                        $mundusMeus.openSearchResults();
                    }, 800);

                }

            });

        };

        if (typeof name === 'undefined') {

            // If we haven't set a name then we'll use the browser to find their location.
            navigator.geolocation.getCurrentPosition(function(position) {

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

}
GeolocationCtrl.$inject = ['$scope', '$http', '$interpolate', '$timeout', '$mundusMeus'];

/**
 * @class SearchCtrl
 * @param $scope {Object}
 * @param $http {Function}
 * @param $mundusMeus {Object}
 * @constructor
 */
function SearchCtrl($scope, $http, $interpolate, $mundusMeus) {

    var URL_SEARCH  = './../api/Search/{{position.latitude}}/{{position.longitude}}';

    $scope.active   = false;
    $scope.results  = [];
    $scope.position = { latitude: null, longitude: null };

    $scope.findMarker = function(model) {
        $mundusMeus.toLocation(model.latitude, model.longitude);
    };

    $scope.$on('entityName', function(context, data) {

        $scope.position.latitude    = data.latitude;
        $scope.position.longitude   = data.longitude;
        var url                     = $scope.$eval($interpolate(URL_SEARCH));

        $http.get(url).success(function(data) {
            $scope.results = data;
            $scope.display = true;
            $mundusMeus.plotMarkers(data);
        });

    });

    $scope.$on('displaySearchResults', function() {
        $scope.active = true;
    });

}
SearchCtrl.$inject = ['$scope', '$http', '$interpolate', '$mundusMeus'];

/**
 * @class MapCtrl
 * @param $scope {Object}
 * @constructor
 */
function MapCtrl($scope, $mundusMeus) {

}
MapCtrl.$inject = ['$scope', '$mundusMeus'];