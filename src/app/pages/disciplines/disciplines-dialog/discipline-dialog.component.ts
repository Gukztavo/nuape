import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DisciplineModel } from 'src/app/model/discipline.model';
import { HelperService } from 'src/app/services/helper.service';
import { DisciplineService } from 'src/app/services/discipline.service';
import { StudentService } from 'src/app/services/student.service';
import { StudentModel } from 'src/app/model/student.model';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-discipline-dialog',
  templateUrl: './discipline-dialog.component.html',
  styleUrls: ['./discipline-dialog.component.scss'],
})
export class DisciplineDialogComponent implements OnInit {

  @Input() discipline: DisciplineModel;

  students: StudentModel[] = [];
  selectedStudents: StudentModel[] = [];

  professors: any[] = [];
  selectedProfessorId: number;

  disciplineForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private disciplineService: DisciplineService,
    private helperService: HelperService,
    private modalController: ModalController,
    private studentsServuce: StudentService,
    private professorService: ProfessorService
  ) { }

  ngOnInit() {
    this.getStudents();
    this.getProfessors();

    if (this.discipline) {
      this.disciplineForm = this.formBuilder.group({
        id: [this.discipline.id],
        name: [this.discipline.name, Validators.required],
        department: [this.discipline.department, Validators.required],
        is_active: [this.discipline.is_active]
      });

      this.selectedProfessorId = this.discipline.teacher.id;
      this.selectedStudents = this.discipline.students;

    } else {
      this.disciplineForm = this.formBuilder.group({
        id: [null],
        name: ['', Validators.required],
        department: ['', Validators.required],
        is_active: [false]
      });
    }
  }

  getStudents() {
    this.studentsServuce.getAll().subscribe({
      next: res => this.students = res,
      error: err => this.helperService.toast(err.message, 'warning')
    });
  }

  onStudentsChange(event: any) {
    event.detail.value.forEach(element => {
      this.selectedStudents.push(element);
    });
  }

  getProfessors() {
    this.professorService.getAll().subscribe({
      next: res => this.professors = res,
      error: err => this.helperService.toast(err.message, 'warning')
    });
  }

  onProfessorChange(event: any) {
    this.selectedProfessorId = event.detail.value;
  }

  async insertDiscipline() {
    if (this.disciplineForm.invalid) {
      this.helperService.toast('Preencha todos os campos corretamente', 'warning');
      return;
    }

    this.helperService.loading('Cadastrando...');

    const data = { ...this.disciplineForm.value, students: this.selectedStudents, teacher_id: this.selectedProfessorId };

    if (this.discipline?.name) {
      this.disciplineService.update(data).subscribe({
        next: response => {
          this.helperService.loading_dismiss();
          this.helperService.toast(response.message, 'success');
          this.modalController.dismiss(data);
        },
        error: err => {
          this.helperService.loading_dismiss();
          this.helperService.toast('Erro ao atualizar disciplina, verifique os dados informados', 'danger');
        }
      });
    } else {
      this.disciplineService.insert(data).subscribe({
        next: response => {
          this.helperService.loading_dismiss();
          this.helperService.toast(response.message, 'success');
          this.modalController.dismiss(data);
        },
        error: err => {
          this.helperService.loading_dismiss();
          this.helperService.toast('Erro ao cadastrar disciplina, verifique os dados informados', 'danger');
        }
      });
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
