<?php
    $status  = $_GET['status'] ?? '';
    $message = $_GET['message'] ?? '';
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NAI/NUAPE - Sistema Acadêmico</title>
    <link rel="icon" href="assets/nuape.png" type="image/png" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
  </head>

  <body>
    <div class="container mt-5 text-center">
      <img
        src="assets/logo.png"
        alt="Logo UTFPR"
        class="img-fluid"
        style="max-width: 300px; margin-bottom: 20px"
      />
      <h1>NAI/NUAPE - Sistema Acadêmico</h1>

      <?php if ($status && $message): ?>
        <div class="alert alert-<?php echo $status === 'success' ? 'success' : 'danger'; ?> alert-dismissible fade show" role="alert">
            <?php echo htmlspecialchars($message); ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    <?php endif; ?>

      <table class="table table-bordered mt-4">
        <thead>
          <tr>
            <th>RA</th>
            <th>Nome do Aluno</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3456</td>
            <td>Fulano Apenas</td>
            <td>
              <button
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#peiModal"
                onclick="loadModalData('3456', 'Fulano Apenas')"
              >
                Visualizar PEI
              </button>
            </td>
          </tr>
          <tr>
            <td>1234</td>
            <td>Fulano da Silva</td>
            <td>
              <button
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#peiModal"
                onclick="loadModalData('1234', 'Fulano da Silva')"
              >
                Visualizar PEI
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal fade"
      id="peiModal"
      tabindex="-1"
      aria-labelledby="peiModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="peiModalLabel">Detalhes do PEI</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="peiForm" class="mt-3" method="post" action="save.php">
              <div class="mb-3">
                <label for="alunoNome" class="form-label">Nome do Aluno</label>
                <input
                  type="text"
                  class="form-control"
                  id="alunoNome"
                  placeholder="Nome do aluno"
                  value="Fulano da Silva"
                  required
                  disabled
                  readonly
                />
                <input type="hidden" name="aluno" value="Fulano da Silva" />
              </div>
              <div class="mb-3">
                <label for="alunoRA" class="form-label">RA do Aluno</label>
                <input
                  type="text"
                  class="form-control"
                  id="alunoRA"
                  placeholder="RA do aluno"
                  value="1234"
                  required
                  disabled
                  readonly
                />
                <input type="hidden" name="ra" value="1234" />
              </div>
              <div class="mb-3">
                <label for="professorName" class="form-label"
                  >Nome do Professor</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="professorName"
                  name="professor"
                  placeholder="Nome do professor"
                  required
                />
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="emailReceived"
                  name="emailReceived"
                  required
                />
                <label class="form-check-label" for="emailReceived">
                  Recebi o PEI por e-mail da coordenação
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="acknowledged"
                  name="acknowledged"
                  required
                />
                <label class="form-check-label" for="acknowledged">
                  Li e estou ciente do PEI
                </label>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
                <button type="submit" class="btn btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <script>
      function loadModalData(ra, aluno) {
        document.getElementById("alunoRA").value = ra;
        document.getElementById("alunoNome").value = aluno;
      }
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>
