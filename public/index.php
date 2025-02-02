<?php

  declare(strict_types = 1); 

  require '../vendor/autoload.php';

  use Nuape\Facade\View;

  $status  = $_GET['status'] ?? null;
  $message = $_GET['message'] ?? null;

  echo View::render('index.html.twig',["status" => $status,"message" => $message]);
?>