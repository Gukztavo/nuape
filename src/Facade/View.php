<?php

declare(strict_types = 1); 

namespace Nuape\Facade;

use Twig\Loader\FilesystemLoader;
use Twig\Environment;

class View {

    public static $instance;

    private static function getInstance() {
        if (!isset(self::$instance)) 
        {
            $loader = new FilesystemLoader('../resources/views');
            self::$instance = new Environment($loader);
        }

        return self::$instance;
    }

    public static function render(string $view, array $data) {
        $instance = self::getInstance();

        return $instance->render($view, $data);
    } 

}