<?php

namespace MundusMeus;

/**
 * @module MundusMeus
 * @class Geolocator_Abstract
 * @package MundusMeus
 */
abstract class Geolocator_Abstract implements Interface_Module {

    /**
     * @var $query
     * @protected
     */
    protected $_query;

    /**
     * @var $_country
     * Country to restrict the search results to.
     * @protected
     */
    protected $_country;

    /**
     * @method _parseResults
     * @return string
     * @abstract
     * @protected
     */
    abstract protected function _parseResults();

    /**
     * @method setQuery
     * @param $query
     * @return void
     */
    public function setQuery($query) {
        $this->_query = rawurlencode($query);
    }

    /**
     * @method restrictCountry
     * @param $countryName
     * @return void
     */
    public function restrictCountry($countryName) {
        $this->_country = $countryName;
    }

    /**
     * @method getJSON
     * @return string
     */
    public function getJSON() {

        $results = $this->_parseResults();

        if ($this->_country) {
            // If we've specified a country to restrict it to, then we need to restrict our results
            // to only that country.
            $results = \array_filter($results, function($result) {
                return ($result['country'] === $this->_country);
            });
        }

        return json_encode($results);

    }

}