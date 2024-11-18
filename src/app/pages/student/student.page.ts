import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../../services/helper.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  studentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private helperService: HelperService
  ) {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      ra: ['', Validators.required]
    });
  }

  ngOnInit() { }

  insertStudent() {
    if (this.studentForm.invalid) {
      this.helperService.toast('Preencha todos os campos corretamente', 'warning');
      return;
    }

    this.helperService.loading('Cadastrando...');

    this.studentService.insert(this.studentForm.value).subscribe({
      next: response => {
        this.helperService.loading_dismiss();
        this.helperService.toast(response.message, 'success');
      },
      error: err => {
        this.helperService.loading_dismiss();
        this.helperService.toast('Erro ao cadastrar aluno, verifique os dados informados', 'danger');
      }
    });
  }

}
