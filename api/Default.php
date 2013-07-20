<?php

namespace MundusMeus;

date_default_timezone_set('Europe/London');
ini_set('display_errors', true);

include 'Interface.php';
include 'Factory.php';
include 'Params.php';
include 'Geolocator/Abstract.php';
include 'Service/Abstract.php';

// Configure the `include_path` to include the Service dir.
$paths = explode(';', get_include_path());
array_push($paths, dirname(__DIR__) . DIRECTORY_SEPARATOR . 'Service');
array_push($paths, dirname(__DIR__) . DIRECTORY_SEPARATOR . 'Geolocator');
set_include_path(join(';', $paths));

switch (Params::get('type')) {

    case ('location'):

        // Instantiate the desired service class via the factory.
        $geolocator = Factory::getInstance()->getGeolocator(Factory::GEOLOCATOR_NOMINATIM);
        $geolocator->restrictCountry('United Kingdom');
        $geolocator->setQuery(Params::get('query'));
        echo $geolocator->getJSON();
        break;

    case ('entities'):

        // Instantiate the desired service class via the factory.
        $service = Factory::getInstance()->getService(Factory::SERVICE_TESCO);
        $service->setRadiusInMiles(10);
        $service->setLatitude(Params::get('latitude'));
        $service->setLongitude(Params::get('longitude'));
        echo $service->getJSON();
        break;

}