/**
 * @module $entitySearch
 * @param {Object} $rootScope
 * @type {Function}
 * @return {Object}
 */
app.factory('$entitySearch', function($rootScope) {

    var service = {};

    /**
     * @method setGeolocation
     * @param placeName {String}
     * @return {void}
     */
    service.setGeolocation = function(placeName) {
        this.location = placeName;
        $rootScope.$broadcast('entityName');
    };

    return service;
});