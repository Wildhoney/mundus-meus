(function() {

    function MundusExample() {

        var rootElement = document.querySelector('.mundus-meus');

        var mundus = new MundusMeus({
            autoGeolocate: true,
            elements: {
                root        : rootElement,
                map         : rootElement.querySelector('.map'),
                text        : rootElement.querySelector('input.search'),
                button      : rootElement.querySelector('input.btn'),

                results: {
                    geolocation: {
                        records: rootElement.querySelector('.geolocation-results'),
                        record: rootElement.querySelector('.geolocation-results li')
                    }
                },
                search      : rootElement.querySelector('.geolocation-results')
            }
        });

    }

    $(document).ready(function() {
        MundusExample();
    });

})();