//(function() {
//
//    function MundusExample() {
//
//        var rootElement = document.querySelector('.mundus-meus');
//
//        var mundus = new MundusMeus({
//            autoGeolocate: true,
//            elements: {
//                root        : rootElement,
//                map         : rootElement.querySelector('.map'),
//                text        : rootElement.querySelector('input.search'),
//                button      : rootElement.querySelector('input.btn'),
//
//                geolocation: {
//                    container: rootElement.querySelector('.geolocation'),
//                    records: rootElement.querySelector('.geolocation-results'),
//                    record: 'li'
//                },
//                search      : rootElement.querySelector('.geolocation-results')
//            }
//        });
//
//    }
//
//    $(document).ready(function() {
//        MundusExample();
//    });
//
//})();