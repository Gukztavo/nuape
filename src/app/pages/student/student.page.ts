import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HelperService } from '../../services/helper.service';
import { StudentService } from 'src/app/services/student.service';
import { StudentModel } from 'src/app/model/student.model';
import { ModalController } from '@ionic/angular';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  students: StudentModel[] = [];

  constructor(
    private studentService: StudentService,
    private modalController: ModalController,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents(): void {
    this.studentService.getAll().subscribe({
      next: res => this.students = res
    });
  }

  deleteStudent(studentId: number) {
    this.studentService.delete(studentId).subscribe({
      next: res => {
        this.helperService.toast(res.message, 'success');
        this.students = this.students.filter((s) => s.id !== studentId);
      },
      error: () => this.helperService.toast("Erro ao excluir aluno, tente novamente", 'danger')
    });
  }

  async openStudentModal(student?: StudentModel) {
    const modal = await this.modalController.create({
      component: StudentDialogComponent,
      componentProps: {
        student: student || null
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.getAllStudents();
      }
    });

    return await modal.present();
  }
}
