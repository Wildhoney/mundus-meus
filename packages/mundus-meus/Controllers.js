/**
 * @class GeolocationCtrl
 * @param $scope {Object}
 * @param $http {Function}
 * @param $interpolate {Function}
 * @param $mundusMeus {Object}
 * @constructor
 */
function GeolocationCtrl($scope, $http, $interpolate, $mundusMeus) {

    var URL_GEOLOCATE = './../api/Geolocate/{{location}}';

    $scope.results      = [];
    $scope.active       = false;
    $scope.location     = null;

    this.location = 'Test';

    /**
     * @method setGeolocation
     * @param data {object}
     * @return {void}
     */
    $scope.setGeolocation = function(data) {
        $mundusMeus.setGeolocation(data);
        $mundusMeus.toLocation(data.lat, data.lon);
    };

    /**
     * @method getGeolocation
     * @param name {String}
     * @return {void}
     */
    $scope.getGeolocation = function(name) {

        $scope.location = name;
        var url = $scope.$eval($interpolate(URL_GEOLOCATE));

        $http.get(url).success(function(data) {
            $scope.results = data;
        });

    };

}
GeolocationCtrl.$inject = ['$scope', '$http', '$interpolate', '$mundusMeus'];

/**
 * @class SearchCtrl
 * @param $scope {Object}
 * @param $http {Function}
 * @param $mundusMeus {Object}
 * @constructor
 */
function SearchCtrl($scope, $http, $mundusMeus) {

    var URL_SEARCH = './../api/Search/';

    $scope.active   = false;
    $scope.results  = [];

    $scope.findMarker = function(model) {
        $mundusMeus.toLocation(model.latitude, model.longitude);
    };

    $scope.$on('entityName', function(context, data) {

        var url = URL_SEARCH + data.lat + '/' + data.lon;

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
SearchCtrl.$inject = ['$scope', '$http', '$mundusMeus'];

/**
 * @class MapCtrl
 * @param $scope {Object}
 * @constructor
 */
function MapCtrl($scope) {


}
MapCtrl.$inject = ['$scope'];