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
    service.setGeolocation = function(data) {
        $rootScope.$broadcast('entityName', data);
    };

    service.toLatLong = function(latitude, longitude) {
        $rootScope.$broadcast('positionUpdate', latitude, longitude);
    };

    service.openSearchResults = function() {
//        this.ma
        $rootScope.$broadcast('displaySearchResults');
//        $rootScope.$broadcast('plotMarkers');
    };

    service.plotMarkers = function(markers) {
        $rootScope.$broadcast('plotMarkers', markers);
    };

    return service;

});