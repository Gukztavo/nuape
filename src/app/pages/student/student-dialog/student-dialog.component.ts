import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StudentModel } from 'src/app/model/student.model';
import { HelperService } from 'src/app/services/helper.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss'],
})
export class StudentDialogComponent implements OnInit {

  @Input() student: StudentModel;

  studentForm: FormGroup;

  selectedFile: File | null = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private helperService: HelperService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    if (this.student) {
      this.studentForm = this.formBuilder.group({
        id: [this.student.id],
        name: [this.student.name, Validators.required],
        ra: [this.student.ra, Validators.required]
      });
    } else {
      this.studentForm = this.formBuilder.group({
        id: [null],
        name: ['', Validators.required],
        ra: ['', Validators.required]
      });
    }
  }

  async insertStudent() {
    if (this.studentForm.invalid) {
      this.helperService.toast('Preencha todos os campos corretamente', 'warning');
      return;
    }

    this.helperService.loading('Cadastrando...');

    if (this.student.id) {
      await this.uploadFile();
    }

    if (this.student.id) {
      this.studentService.update(this.studentForm.value).subscribe({
        next: response => {
          this.helperService.loading_dismiss();
          this.helperService.toast(response.message, 'success');
          this.modalController.dismiss(this.studentForm.value);
        },
        error: err => {
          this.helperService.loading_dismiss();
          this.helperService.toast('Erro ao atualizar aluno, verifique os dados informados', 'danger');
        }
      });
    } else {
      this.studentService.insert(this.studentForm.value).subscribe({
        next: response => {
          this.helperService.loading_dismiss();
          this.helperService.toast(response.message, 'success');
          this.modalController.dismiss(this.studentForm.value);
        },
        error: err => {
          this.helperService.loading_dismiss();
          this.helperService.toast('Erro ao cadastrar aluno, verifique os dados informados', 'danger');
        }
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async uploadFile() {
    if (!this.selectedFile) {
      this.helperService.toast('Selecione um arquivo primeiro', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('file_content', this.selectedFile, this.selectedFile.name);
    formData.append('file_name', this.selectedFile.name);
    formData.append('student_id', this.student.id.toString());

    this.studentService.insertAlunoPdf(formData).subscribe({
      next: res => this.helperService.toast("Arquivo salvo com sucesso", 'success'),
      error: err => this.helperService.toast('Erro ao salvar arquivo: ' + err.error.message, 'danger')
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
