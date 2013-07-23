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
        $rootScope.$broadcast('entityName', data);
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