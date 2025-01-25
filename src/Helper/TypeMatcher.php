<?php

namespace Nuape\Helper;
use PDO;

class TypeMatcher
{
    public static function match($value): int 
    {
        if(strtotime($value))
        {
            return PDO::PARAM_STR;
        }

        return match (gettype($value)) {
            "integer" => PDO::PARAM_INT,
            "string" =>  PDO::PARAM_STR
        };
    }
}