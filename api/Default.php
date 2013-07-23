<?php

namespace MundusMeus;

date_default_timezone_set('Europe/London');
ini_set('display_errors', false);

// Laravel inspired PHP Router
// Reference: https://github.com/jenssegers/php-router
use Jenssegers\Router, Jenssegers\Route;
include './../lib/php-router/src/Jenssegers/Route.php';
include './../lib/php-router/src/Jenssegers/Router.php';

// Mundus Meus library includes.
include 'Interface.php';
include 'Factory.php';
include 'Geolocator/Abstract.php';
include 'Service/Abstract.php';

// Configure the `include_path` to include the Service dir.
$paths = explode(';', get_include_path());
array_push($paths, dirname(__DIR__) . DIRECTORY_SEPARATOR . 'Service');
array_push($paths, dirname(__DIR__) . DIRECTORY_SEPARATOR . 'Geolocator');
set_include_path(join(';', $paths));

Route::get('/Geolocate/(:all)', function($query) {

    // Instantiate the desired service class via the factory.
    $geolocator = Factory::getInstance()->getGeolocator(Factory::GEOLOCATOR_NOMINATIM);
    $geolocator->restrictCountry('United Kingdom');
    $geolocator->setQuery($query);
    return $geolocator->getJSON();

});

Route::get('/Search/(:any)/(:any)/(:num?)', function($latitude, $longitude, $radiusInMiles = 10) {

    // Instantiate the desired service class via the factory.
    $service = Factory::getInstance()->getService(Factory::SERVICE_TESCO);
    $service->setRadiusInMiles($radiusInMiles);
    $service->setLatitude($latitude);
    $service->setLongitude($longitude);
    return $service->getJSON();

});