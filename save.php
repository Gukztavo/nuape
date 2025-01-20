<?php

$db = new SQLite3('pei_database.sqlite');

$db->exec("CREATE TABLE IF NOT EXISTS confirmations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ra TEXT NOT NULL,
    aluno TEXT NOT NULL,
    professor TEXT NOT NULL,
    email_received INTEGER NOT NULL,
    acknowledged INTEGER NOT NULL,
    confirmation_date TEXT NOT NULL
)");

$ra               = $_POST['ra'] ?? '';
$aluno            = $_POST['aluno'] ?? '';
$professor        = $_POST['professor'] ?? '';
$emailReceived    = isset($_POST['emailReceived']) ? 1 : 0;
$acknowledged     = isset($_POST['acknowledged']) ? 1 : 0;
$confirmationDate = date('Y-m-d H:i:s');

echo print_r($_POST, 1);

if ($ra && $aluno && $professor && $emailReceived && $acknowledged) {
    $stmt = $db->prepare("INSERT INTO confirmations (ra, aluno, professor, email_received, acknowledged, confirmation_date) VALUES (:ra, :aluno, :professor, :emailReceived, :acknowledged, :confirmationDate)");
    $stmt->bindValue(':ra', $ra, SQLITE3_TEXT);
    $stmt->bindValue(':aluno', $aluno, SQLITE3_TEXT);
    $stmt->bindValue(':professor', $professor, SQLITE3_TEXT);
    $stmt->bindValue(':emailReceived', $emailReceived, SQLITE3_INTEGER);
    $stmt->bindValue(':acknowledged', $acknowledged, SQLITE3_INTEGER);
    $stmt->bindValue(':confirmationDate', $confirmationDate, SQLITE3_TEXT);

    if ($stmt->execute()) {
        header('Location: index.php?status=success&message=' . urlencode('Dados salvos com sucesso!'));
        exit();
    } else {
        header('Location: index.php?status=error&message=' . urlencode('Erro ao salvar os dados.'));
        exit();
    }
} else {
    header('Location: index.php?status=error&message=' . urlencode('Todos os campos são obrigatórios.'));
    exit();
}
