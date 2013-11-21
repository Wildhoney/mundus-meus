<?php

namespace MundusMeus;

/**
 * @module MundusMeus
 * @class Geolocator_Nominatim
 * @package MundusMeus
 */
class Geolocator_Nominatim extends Geolocator_Abstract {

    /**
     * @const API_URL
     * URL to the Nominatim API.
     */
    const API_URL = 'http://nominatim.openstreetmap.org/search?format=json&limit=5&q=%s&addressdetails=1';

    /**
     * @method _parseResults
     * Parse the results from the Nominatim API.
     * @return array
     * @protected
     */
    function _parseResults() {

        $url        = sprintf(self::API_URL, $this->_query);
        $data       = json_decode(file_get_contents($url));
        $records    = array();

        foreach ($data as $datum) {

            $record = array(
                'city'      => (isset($datum->address->city)) ? $datum->address->city
                                                              : $datum->address->county,
                'country'   => $datum->address->country,
                'latitude'  => $datum->lat,
                'longitude' => $datum->lon);

            array_push($records, $record);

        }

        return $records;
    }

}