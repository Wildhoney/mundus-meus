"use strict";
// Initialise the app.
var app = angular.module('mundusMeusApp', []);
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

        var getResults = function getResults() {

            var url = $scope.$eval($interpolate(URL_GEOLOCATE));

            $http.get(url).success(function success(data) {

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

}
GeolocationCtrl.$inject = ['$scope', '$http', '$interpolate', '$timeout', '$mundusMeus'];

/**
 * @class SearchCtrl
 * @param $scope {Object}
 * @param $http {Function}
 * @param $interpolate {Function}
 * @param $mundusMeus {Object}
 * @constructor
 */
function SearchCtrl($scope, $http, $interpolate, $mundusMeus) {

    var URL_SEARCH  = './../api/Search/{{position.latitude}}/{{position.longitude}}';

    $scope.active   = false;
    $scope.results  = [];
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
     * @event locationUpdated
     * @param context {Object}
     * @param data {Object}
     * @return {void}
     */
    $scope.$on('locationUpdated', function locationUpdated(context, data) {

        $scope.position.latitude    = data.latitude;
        $scope.position.longitude   = data.longitude;
        var url                     = $scope.$eval($interpolate(URL_SEARCH));

        $http.get(url).success(function(data) {
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

}
SearchCtrl.$inject = ['$scope', '$http', '$interpolate', '$mundusMeus'];

/**
 * @class MapCtrl
 * @param $scope {Object}
 * @param $mundusMeus {Object}
 * @constructor
 */
function MapCtrl($scope, $mundusMeus) {

}
MapCtrl.$inject = ['$scope', '$mundusMeus'];
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

        // Insert the tile layer; can be changed by supplying the `tiles` attribute in the options.
        L.tileLayer('http://b.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/102960/256/{z}/{x}/{y}.png').addTo(map);

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
         * @param {Object}
         * @models {Array}
         * Plot the markers on the Leaflet.js map
         * @return {void}
         */
        $scope.$on('plotMarkers', function(context, models) {

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
                var icon    = L.divIcon({className: 'marker-icon index-' + allMarkers.length, size: [100, 100]}),
                    marker  = L.marker([model.latitude, model.longitude], {icon: icon}).addTo(map);

                // Keep a track of the markers in the collection.
                allMarkers.push({ model: model, marker: marker });

                // Append each lat/long pair to calculate the bounds.
                latLongBounds.push([model.latitude, model.longitude]);

            });

            map.fitBounds([latLongBounds]);

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
/**
 * @module $entitySearch
 * @param {Object} $rootScope
 * @type {Function}
 * @return {Object}
 */
app.factory('$mundusMeus', function($rootScope) {

    var service = {};

    /**
     * @method setGeolocation
     * @param data {String}
     * @return {void}
     */
    service.setGeolocation = function setLocation(data) {
        $rootScope.$broadcast('locationUpdated', data);
    };

    /**
     * @method toLocation
     * @param latitude {number}
     * @param longitude {number}
     * @return {void}
     */
    service.toLocation = function toLocation(latitude, longitude) {
        $rootScope.$broadcast('positionUpdate', latitude, longitude);
    };

    /**
     * @method openSearchResults
     * @return {void}
     */
    service.openSearchResults = function openSearchResults() {
        $rootScope.$broadcast('displaySearchResults');
    };

    /**
     * @method highlightMarker
     * @param model {Object}
     * @return {void}
     */
    service.highlightMarker = function highlightMarker(model) {
        $rootScope.$broadcast('highlightMarker', model);
    };

    /**
     * @method plotMarkers
     * @param markers {Array}
     * @return {void}
     */
    service.plotMarkers = function plotMarkers(markers) {
        $rootScope.$broadcast('plotMarkers', markers);
    };

    return service;

});