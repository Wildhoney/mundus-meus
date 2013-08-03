<?php

namespace MundusMeus;

/**
 * @module MundusMeus
 * @class Factory
 * @package MundusMeus
 */
class Factory {

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
     * @param $name
     * @throws \Exception
     * @return \MundusMeus\Geolocator_Abstract
     */
    public function getGeolocator($name) {
        return $this->_include(sprintf('Geolocator_%s', $name));
    }

    /**
     * @method getService
     * @param $name
     * @throws \Exception
     * @return \MundusMeus\Service_Abstract
     */
    public function getService($name) {
        return $this->_include(sprintf('Service_%s', $name));
    }

    /**
     * @method _include
     * @param $factoryClassName
     * @return Interface_Module
     * @throws \Exception
     * @private
     */
    private function _include($factoryClassName) {

        list ($prefix, $name)   = explode('_', $factoryClassName);
        $filePath               = sprintf('%s%s%s.php', $prefix, DIRECTORY_SEPARATOR, $name);
        $className              = sprintf('\\%s\\%s', __NAMESPACE__, $factoryClassName);

        if (!file_exists($filePath)) {
            // If we're unable to find the service class then we'll throw an exception.
            throw new \Exception(sprintf('Unable to locate class "%s" for inclusion and instantiation.', $name));
        }

        // Otherwise can include the service class, and then instantiate it.
        include $filePath;
        return new $className();

    }

}