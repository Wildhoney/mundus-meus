describe('Mundus Meus', function() {

    describe('GeolocationController', function() {

        var $httpBackend, $controller, createController;

        beforeEach(angular.mock.module('mundusMeusApp'));

        beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {

            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', './../api/Geolocate/Nottingham').respond(['firstPlace', 'secondPlace', 'thirdPlace']);

            createController = function createController(name) {
                var scope = $rootScope.$new();
                $controller(name, { $scope: $rootScope });
                return scope;
            };

        }));

        it ('Should contain an empty results array', function() {
            var scope = createController('GeolocationController');
            scope.getGeolocation('Nottingham');
            $httpBackend.flush();
            expect(scope.results.length).toEqual(3);
        });

    });

});