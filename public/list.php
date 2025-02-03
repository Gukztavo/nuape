<?php
  
  declare(strict_types = 1); 

  require '../vendor/autoload.php';

  use Nuape\Facade\Database;
  use Nuape\Facade\View;

  $sql = "select id
                 , ra
                 , aluno
                 , professor
                 , CASE WHEN email_received = 1 THEN 'SIM'
                          ELSE 'Não' 
                        END as email_received
                 , CASE WHEN acknowledged = 1 THEN 'SIM'
                          ELSE 'Não' 
                        END as acknowledged
                 , confirmation_date 
                 from confirmations
                 order by confirmation_date desc
                 limit 50";

  $rows = Database::queryAll($sql,[]);

  echo View::render('list.html.twig',['confirmations' => $rows])
?>