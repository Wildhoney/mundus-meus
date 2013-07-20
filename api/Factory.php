<?php

namespace MundusMeus;

/**
 * @module MundusMeus
 * @class Service
 * @package MundusMeus
 */
class Factory {

    /**
     * @const SERVICE_NOMINATIM
     * @type {String}
     */
    const SERVICE_NOMINATIM = 'Geolocator_Nominatim';

    /**
     * @var $_instance
     * Instance of the `Factory` class.
     * @static
     * @private
     */
    private static $_instance;

    /**
     * @method __construct
     * As the `Factory` class is a singleton, we'll prevent the class from being instantiated
     * by making the constructor private.
     * @constructor
     */
    private function __construct() {}

    /**
     * @method getInstance
     * Singleton accessor for the `Factory` class.
     * @return Factory
     */
    public static function getInstance() {

        if (!self::$_instance) {
            // Instantiate myself!
            self::$_instance = new self();
        }

        return self::$_instance;

    }

    /**
     * @method getGeolocator
     * @param $serviceName
     * @throws \Exception
     * @return \MundusMeus\Geolocator_Abstract
     */
    public function getGeolocator($serviceName) {

        list ($prefix, $name)   = explode('_', $serviceName);
        $filePath               = sprintf('%s%s%s.php', $prefix, DIRECTORY_SEPARATOR, $name);
        $className              = sprintf('\\%s\\%s', __NAMESPACE__, $serviceName);

        if (!file_exists($filePath)) {
            // If we're unable to find the service class then we'll throw an exception.
            throw new \Exception(sprintf('Unable to locate service class "%s" for instantiation.', $serviceName));
        }

        // Otherwise can include the service class, and then instantiate it.
        include $filePath;
        return new $className();

    }

}