import { Component } from '@angular/core';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.page.html',
  styleUrls: ['./professor.page.scss'],
})
export class ProfessorPage {
  professor = {
    nome: '',
    email: '',
    senha: '',
    cpf: ''
  };

  constructor() { }

  validarSenha() {

  }

  cadastrarProfessor() {
    if (this.professor.senha.length < 3) {
      alert("senha invalida");
      return; 
    }

    alert(`Professor ${this.professor.nome} cadastrado com sucesso!`);

    // Limpar o formulário
    this.professor = {
      nome: '',
      email: '',
      senha: '',
      cpf: ''
    };
  }
}


