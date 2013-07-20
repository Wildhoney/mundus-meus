<?php

namespace MundusMeus;

date_default_timezone_set('Europe/London');
ini_set('display_errors', false);

include 'Factory.php';
include 'Geolocator/Abstract.php';

// Configure the `include_path` to include the Service dir.
$paths = explode(';', get_include_path());
array_push($paths, dirname(__DIR__) . DIRECTORY_SEPARATOR . 'Service');
set_include_path(join(';', $paths));

// Instantiate the desired service class via the factory.
$service = Factory::getInstance()->getGeolocator(Factory::SERVICE_NOMINATIM);
//$service->restrictCountry('United Kingdom');
$service->setQuery($_GET['query']);
echo $service->getJSON();