<?php

require '../vendor/autoload.php';

use Nuape\Facade\Database;

Database::migrateUp();

$ra               = $_POST['ra'] ?? '';
$aluno            = $_POST['aluno'] ?? '';
$professor        = $_POST['professor'] ?? '';
$emailReceived    = isset($_POST['emailReceived']) ? 1 : 0;
$acknowledged     = isset($_POST['acknowledged']) ? 1 : 0;
$confirmationDate = date('Y-m-d H:i:s');


if ($ra && $aluno && $professor && $emailReceived && $acknowledged) {

    $sql = "INSERT INTO confirmations (ra, aluno, professor, email_received, acknowledged, confirmation_date) VALUES (:p_ra, :p_aluno, :p_professor, :p_emailReceived, :p_acknowledged, :p_confirmationDate)";

    $binds[':p_ra'] = $ra;
    $binds[':p_aluno'] = $aluno;
    $binds[':p_professor'] = $professor;
    $binds[':p_emailReceived'] = $emailReceived;
    $binds[':p_acknowledged'] = $acknowledged;
    $binds[':p_confirmationDate'] = $confirmationDate;

    $result = Database::executeStatement($sql,$binds);

    if ($result) 
    {
        header('Location: index.php?status=success&message=' . urlencode('Dados salvos com sucesso!'));
        return;
    }

    header('Location: index.php?status=error&message=' . urlencode('Erro ao salvar os dados.'));
    return;
    
} else {
    header('Location: index.php?status=error&message=' . urlencode('Todos os campos são obrigatórios.'));
    return;
}
