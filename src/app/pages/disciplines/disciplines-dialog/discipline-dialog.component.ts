import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DisciplineModel } from 'src/app/model/discipline.model';
import { HelperService } from 'src/app/services/helper.service';
import { DisciplineService } from 'src/app/services/discipline.service';

@Component({
  selector: 'app-discipline-dialog',
  templateUrl: './discipline-dialog.component.html',
  styleUrls: ['./discipline-dialog.component.scss'],
})
export class DisciplineDialogComponent implements OnInit {

  @Input() discipline: DisciplineModel;

  disciplineForm: FormGroup;

  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private disciplineService: DisciplineService,
    private helperService: HelperService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    if (this.discipline) {
      this.disciplineForm = this.formBuilder.group({
        name: [this.discipline.name, Validators.required],
        // ra: [this.discipline.ra, Validators.required]
      });
    } else {
      this.disciplineForm = this.formBuilder.group({
        id: [null],
        name: ['', Validators.required],
        ra: ['', Validators.required]
      });
    }
  }

  async insertDiscipline() {
    if (this.disciplineForm.invalid) {
      this.helperService.toast('Preencha todos os campos corretamente', 'warning');
      return;
    }

    this.helperService.loading('Cadastrando...');

    if (this.discipline?.name) {
      this.disciplineService.update(this.disciplineForm.value).subscribe({
        next: response => {
          this.helperService.loading_dismiss();
          this.helperService.toast(response.message, 'success');
          this.modalController.dismiss(this.disciplineForm.value);
        },
        error: err => {
          this.helperService.loading_dismiss();
          this.helperService.toast('Erro ao atualizar aluno, verifique os dados informados', 'danger');
        }
      });
    } else {
      this.disciplineService.insert(this.disciplineForm.value).subscribe({
        next: response => {
          this.helperService.loading_dismiss();
          this.helperService.toast(response.message, 'success');
          this.modalController.dismiss(this.disciplineForm.value);
        },
        error: err => {
          this.helperService.loading_dismiss();
          this.helperService.toast('Erro ao cadastrar aluno, verifique os dados informados', 'danger');
        }
      });
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
