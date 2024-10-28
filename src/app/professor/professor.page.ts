import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.page.html',
  styleUrls: ['./professor.page.scss'],
})
export class ProfessorPage implements OnInit {
  professorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private helperService: HelperService
  ) {
    this.professorForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      specialization: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async cadastrarProfessor() {
    if (this.professorForm.invalid) {
      this.helperService.toast('Preencha todos os campos corretamente', 'warning');
      return;
    }
  
    this.helperService.loading('Cadastrando...');
  
    try {
      const response = await this.authService.cadastrar(this.professorForm.value);
  
      this.helperService.loading_dismiss();
  
      // Verifica se a resposta tem 'error: false', indicando sucesso
      if (response.error === false) {
        this.helperService.toast(response.message || 'Professor cadastrado com sucesso!', 'success');
        // Redireciona para a página inicial
      } else {
        this.helperService.toast(response.message || 'Ocorreu um erro ao cadastrar o professor', 'danger');
      }
    } catch (error) {
      this.helperService.loading_dismiss();
      this.helperService.toast('Erro ao cadastrar professor: Verifique os Dados', 'danger');
      console.error('Erro ao cadastrar professor:', error);
    }
  }
  
}
