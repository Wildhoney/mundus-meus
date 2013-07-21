/**
 * @class GeolocationCtrl
 * @param $scope {Object}
 * @param $http {Function}
 * @param $interpolate {Function}
 * @param $entitySearch {Object}
 * @constructor
 */
function GeolocationCtrl($scope, $http, $interpolate, $entitySearch) {

    var URL_GEOLOCATE = './../api/Geolocate/';

    $scope.results      = [];
    $scope.active       = false;
    $scope.model        = { name: 'Nottingham' };

    /**
     * @method setGeolocation
     * @param placeName {string}
     * @return {void}
     */
    $scope.setGeolocation = function(placeName) {
        $entitySearch.setGeolocation(placeName);
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
GeolocationCtrl.$inject = ['$scope', '$http', '$interpolate', '$entitySearch'];

/**
 * @class SearchCtrl
 * @param $scope {Object}
 * @param $http {Function}
 * @param $entitySearch {Object}
 * @constructor
 */
function SearchCtrl($scope, $http, $entitySearch) {

    var URL_SEARCH = './../api/Search/';

    $scope.$on('entityName', function() {

        var url = URL_SEARCH + $entitySearch.location.lat + '/' + $entitySearch.location.lon;

        $http.get(url).success(function(data) {
            $scope.results = data;
        });

    });

}
SearchCtrl.$inject = ['$scope', '$http', '$entitySearch'];

/**
 * @class MapCtrl
 * @param $scope {Object}
 * @constructor
 */
function MapCtrl($scope) {

}
MapCtrl.$inject = ['$scope'];