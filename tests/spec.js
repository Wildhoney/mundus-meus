describe('Mundus Meus', function() {

    describe('GeolocationController', function() {

        var $httpBackend, createController;

        beforeEach(angular.mock.module('mundusMeusApp'));

        beforeEach(angular.mock.inject(function($rootScope, $controller, $injector) {

            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.when('GET', './../api/Geolocate/Nottingham').respond(['firstPlace', 'secondPlace', 'thirdPlace']);

            var $mundusMeus = $injector.get('$mundusMeus');

            createController = function createController(name) {
                var scope = $rootScope.$new();
                $controller(name, { $scope: $rootScope, $mundusMeus: $mundusMeus });
                return scope;
            };

        }));

        it ('Should contain an empty results array', function() {
            var scope = createController('GeolocationController');
            scope.getGeolocation('Nottingham');
            $httpBackend.flush();
            expect(scope.results.length).toEqual(3);
        });

        it ('Should be able to set a custom radius', function() {
            var scope = createController('GeolocationController');
            scope.setRadius(5);
            expect(scope.radius).toEqual(5);
        });

    });

});