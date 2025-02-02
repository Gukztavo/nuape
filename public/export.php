<?php

declare(strict_types = 1); 

require '../vendor/autoload.php';

use Nuape\Facade\Database;

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
               from confirmations";

$rows = Database::queryAll($sql,[]);

header('Content-Type: application/csv');
header('Content-Disposition: attachment; filename="relatorio_pei.csv";');

$f = fopen('php://output', 'w');

$headers = ['#','RA','ALUNO','PROFESSOR','EMAIL_RECEBIDO','CIENTE','DATA DE CONFIRMAÇÃO'];
fputcsv($f, $headers,",", "\"","");

foreach ($rows as $line) {
    fputcsv($f, $line,",", "\"","");
}

