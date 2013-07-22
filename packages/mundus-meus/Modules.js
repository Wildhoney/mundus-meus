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

    /**
     * @method toLocation
     * @param latitude {number}
     * @param longitude {number}
     * @return {void}
     */
    service.toLocation = function(latitude, longitude) {
        $rootScope.$broadcast('positionUpdate', latitude, longitude);
    };

    /**
     * @method openSearchResults
     * @return {void}
     */
    service.openSearchResults = function() {
        $rootScope.$broadcast('displaySearchResults');
    };

    /**
     * @method highlightMarker
     * @param model {Object}
     * @return {void}
     */
    service.highlightMarker = function(model) {
        $rootScope.$broadcast('highlightMarker', model);
    };

    /**
     * @method plotMarkers
     * @param models {Array}
     * @return {void}
     */
    service.plotMarkers = function(models) {
        $rootScope.$broadcast('plotMarkers', models);
    };

//    service.detectLocation = function() {
//        $rootScope.$broadcast('detectLocation');
//    };

    return service;

});