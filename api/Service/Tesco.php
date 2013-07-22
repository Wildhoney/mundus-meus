<?php

namespace MundusMeus;

/**
 * @module MundusMeus
 * @class Service_Tesco
 * @package MundusMeus
 */
class Service_Tesco extends Service_Abstract {

    /**
     * @property $_map
     * @var array
     * Desired attributes mapped to the properties from the JSON data.
     * @protected
     */
    protected $_map = array(
        'placeName' => 'name',
        'lat'       => 'latitude',
        'lng'       => 'longitude'
    );

    /**
     * @const API_URL
     * URL to the Tesco Store Locator API.
     */
    const API_URL = 'http://www.tesco.com/storeLocator/sf.asp?Lat=%f&Lng=%f&Rad=10&storeType=all';

    /**
     * @method _parseData
     * @param {string} $data
     * Optional hook to parse the data if it isn't your typical JSON data.
     * @return array
     * @protected
     */
    protected function _parseData($data) {

        // Parse the Tesco.com store locator results.
        preg_match_all('~"lat":"(?P<lat>.+?)",\s+"lng":"(?P<lng>.+?),\s+.+?\s+"placeName":"(?P<placeName>.+?)"~mx', $data, $matches);

        $records        = array();
        $recordCount    = count($matches[0]);

        for ($index = 0; $index < $recordCount; $index++) {

            $record = array(
                // Package each result into the array.
                'lat'       => $matches[1][$index],
                'lng'       => $matches[2][$index],
                'placeName' => ucwords(strtolower($matches[3][$index]))
            );

            // ...And push it into the master array.
            array_push($records, $record);

        }

        return $records;

    }

}