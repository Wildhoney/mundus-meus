<?php

namespace MundusMeus;

/**
 * @module MundusMeus
 * @class Service_Abstract
 * @package MundusMeus
 */
abstract class Service_Abstract implements Interface_Module {

    /**
     * @constant EARTH_RADIUS_MILES
     * @type integer
     * @default 3959
     */
    const EARTH_RADIUS_MILES = 3959;

    /**
     * @var $_latitude
     * @type float
     * @protected
     */
    protected $_latitude;

    /**
     * @var $_longitude
     * @type float
     * @protected
     */
    protected $_longitude;

    /**
     * @var $_radius
     * @type integer
     * @default 10
     * @protected
     */
    protected $_radius = 10;

    /**
     * @method setRadiusInMiles
     * @param $miles
     * @return void
     */
    public function setRadiusInMiles($miles) {
        $this->_radius = $miles;
    }

    /**
     * @method setLatitude
     * @param $latitude
     * @return void
     */
    public function setLatitude($latitude) {
        $this->_latitude = $latitude;
    }

    /**
     * @method setLongitude
     * @param $longitude
     * @return void
     */
    public function setLongitude($longitude) {
        $this->_longitude = $longitude;
    }

    /**
     * @method getJSON
     * @throws \Exception
     * @return string
     */
    public function getJSON() {

        $url        = sprintf(static::API_URL, $this->_latitude, $this->_longitude);
        $data       = file_get_contents($url);

        // Use the user defined `_parseData` method if it exists, otherwise attempt to decode the JSON data.
        if (method_exists($this, '_parseData')) $data = $this->_parseData($data);
        else                                    $data = json_decode($data);

        if (!$data) {
            // Throw an exception if the data is invalid.
            throw new \Exception('Unable to parse the data. Have you tried implementing your own `_parseData`?');
        }

        if ($this->_map) {
            // Change the properties based on the `_map`, if it exists.
            $this->_mapProperties($data);
        }

        // Remove those that fall out of the radius.
        $data = \array_filter($data, function(&$datum) {

            // Compute the distance, and check whether it's in the desired radius in miles.
            $distance           = $this->_calculateDistance($datum);
            $isWithinDistance   = ($distance <= $this->_radius);

            if (!$isWithinDistance) {
                // If it's more than the desired radius in miles then we'll discard it.
                return false;
            }

            // Inject the distance in miles into the record, if it's valid.
            $datum['distance'] = $distance;
            return true;

        });

        $data = array_values($data);

        return json_encode($data);

    }

    /**
     * @method _mapProperties
     * @param {array} $data
     * @private
     */
    private function _mapProperties(&$data) {

        foreach ($data as &$datum) {

            foreach ($datum as $propertyName => $value) {

                if (!isset($this->_map[$propertyName])) {
                    // If the property doesn't exist in the map then we can skip it.
                    continue;
                }

                // Find which property name to change it to.
                $changeTo = $this->_map[$propertyName];

                // Add the new property name, and remove the old one.
                $datum[$changeTo] = $datum[$propertyName];
                unset($datum[$propertyName]);

            }

        }

    }

    /**
     * @method _calculateDistance
     * @param $row
     * @return integer
     * @private
     */
    private function _calculateDistance($row) {

        // Typecast all of the latitude/longitude values to a float.
        $currentLatitude        = (float) $this->_latitude;
        $currentLongitude       = (float) $this->_longitude;
        $previousLatitude       = (float) $row['latitude'];
        $previousLongitude      = (float) $row['longitude'];

        // Calculate the distance travelled in miles.
        $degreeLatitude         = deg2rad($previousLatitude - $currentLatitude);
        $degreeLongitude        = deg2rad($previousLongitude - $currentLongitude);
        $currentLatitude        = deg2rad($currentLatitude);
        $previousLatitude       = deg2rad($previousLatitude);

        $first                  = sin($degreeLatitude / 2) * sin($degreeLatitude / 2) + sin($degreeLongitude / 2) *
                                  sin($degreeLongitude / 2) * cos($currentLatitude) * cos($previousLatitude);
        $second                 = 2 * atan2(sqrt($first), sqrt(1 - $first));

        return self::EARTH_RADIUS_MILES * $second;

    }

}