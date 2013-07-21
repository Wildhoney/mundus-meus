var app = angular.module('mundusMeusApp', []);
"use strict";

app.factory('$entitySearch', function($rootScope) {
    var service = {};
    service.setGeolocation = function(placeName) {
        this.location = placeName;
        $rootScope.$broadcast('entityName');
    };
    return service;
});

/**
 * @class GeolocationCtrl
 * @param $scope {object}
 * @param $http {function}
 * @param $interpolate {function}
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
 * @param $scope {object}
 * @param $http {function}
 * @param $entitySearch {object}
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
 * @param $scope {object}
 * @constructor
 */
function MapCtrl($scope) {

}


/**
 * @directive map
 * @restrict E
 * Container for the Leaflet map.
 * @type {function}
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
 * Button that initialises the geolocation.
 * @type {function}
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
 * Search query for the geolocation.
 * @type {function}
 */
app.directive('geolocateText', function() {
    return { restrict: 'A', link: function($scope, $element) {
        $element.bind('keyup', function() {
            $scope.model.name = $element.context.value;
            $scope.$apply();
        });

    }};
});

///**
// * @module MundusMeus
// * @param {object} options
// * @constructor
// */
//function MundusMeus(options) {
//
//    // Configure all of the necessary options.
//    this.options    = options;
//    this.paths      = {
//        geolocate: './../api/Geolocate/%@',
//        search: './../api/Search/%@/%@'
//    };
//
//    // Memorise the content of the templates.
//    this.templates = {};
//    this.templates.GEOLOCATION  = options.elements.geolocation.records.innerHTML;
//    this.templates.SEARCH       = options.elements.search.innerHTML;
//
//    // Configure the onClick event.
//    this.configureEvents();
//
//    // Initialise the LeafletJS map.
//    this.createMap();
//
//}
//
///**
// * @module MundusMeus
// * @property prototype
// * @type {object}
// */
//MundusMeus.prototype = {
//
//    updateTemplate: function(templateName, objects) {
//
//    },
//
//    configureEvents: function() {
//
//        var elements    = this.options.elements,
//            button      = $(elements.button);
//
//        var template    = this.templates.GEOLOCATION,
//            url         = this.paths.geolocate,
//            interpolate = this.interpolate,
//            records     = elements.geolocation.records,
//            record      = elements.geolocation.record,
//            container   = elements.geolocation.container;
//
//        button.on('click', function() {
//
//            var geolocateUrl = interpolate(url, [$(elements.text).val()]);
//
//            $(container).addClass('active');
//
//            // Notify the view that we're loading the result set.
//            var html = Mustache.render(template, { isLoading: true });
//            records.innerHTML = html;
//
//            $.getJSON(geolocateUrl, function(results) {
//
//                var html = Mustache.render(template, { results: results, isLoading: false });
//                records.innerHTML = html;
//
//                var items = $(records).find(record);
//                items.on('click', function(clicked) {
//                    console.log(clicked);
//                }.bind());
//
//            });
//
//        });
//
//    },
//
//    /**
//     * @method createMap
//     * @return {void}
//     */
//    createMap: function() {
//
//        // Instantiate the map.
//        var map = L.map(this.options.elements.map, {
//            center: [51.505, -0.09],
//            zoom: 13
//        });
//
//        // Insert the tile layer; can be changed by supplying the `tiles` attribute in the options.
//        L.tileLayer(this.options.tiles || 'http://b.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/102960/256/{z}/{x}/{y}.png').addTo(map);
//
//    },
//
//    /**
//     * @method interpolate
//     * @param value {String}
//     * @param formats {Array}
//     * @return {string}
//     */
//    interpolate: function(value, formats) {
//
//        var index  = 0;
//
//        return value.replace(/%@([0-9]+)?/g, function(s, argIndex) {
//            argIndex = (argIndex) ? parseInt(argIndex,0) - 1 : index++ ;
//            s = formats[argIndex];
//            return ((s === null) ? '(null)' : (s === undefined) ? '' : s).toString();
//        });
//
//    }
//
//};