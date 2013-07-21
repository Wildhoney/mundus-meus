/**
 * @class GeolocationCtrl
 * @param $scope {Object}
 * @param $http {Function}
 * @param $interpolate {Function}
 * @param $mundusMeus {Object}
 * @constructor
 */
function GeolocationCtrl($scope, $http, $interpolate, $mundusMeus) {

    var URL_GEOLOCATE = './../api/Geolocate/';

    $scope.results      = [];
    $scope.active       = false;
    $scope.model        = { name: 'London' };

    /**
     * @method setGeolocation
     * @param placeName {string}
     * @return {void}
     */
    $scope.setGeolocation = function(placeName) {
        $mundusMeus.setGeolocation(placeName);
    };

    /**
     * @method getGeolocation
     * @param placeName
     * @return {void}
     */
    $scope.getGeolocation = function(placeName) {

//        var url = $scope.$eval($interpolate(URL_GEOLOCATE));
        var url = URL_GEOLOCATE + placeName;

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

    $scope.active = false;

    $scope.findMarker = function(model) {
        $mundusMeus.toLatLong(model.latitude, model.longitude);
    };

    $scope.$on('entityName', function(context, data) {

        var url = URL_SEARCH + data.lat + '/' + data.lon;

        $http.get(url).success(function(data) {
            $scope.results = data;
            $mundusMeus.plotMarkers(data);
            $scope.display = true;
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