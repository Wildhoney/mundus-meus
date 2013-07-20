<?php

namespace MundusMeus;

/**
 * @module MundusMeus
 * @class Params
 * @package MundusMeus
 */
class Params {

    /**
     * @method get
     * @param $propertyName
     * @return mixed
     * @static
     */
    static public function get($propertyName) {
        return $_GET[$propertyName] ?: null;
    }

}