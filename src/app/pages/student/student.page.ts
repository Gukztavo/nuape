import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { StudentService } from 'src/app/services/student.service';
import { StudentModel } from 'src/app/model/student.model';
import { ModalController } from '@ionic/angular';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { StudentPdfComponent } from './student-pdf/student-pdf.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  students: StudentModel[] = [];

  pdfUrl: string | undefined;

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
        this.students = this.students.filter(s => s.id !== studentId);
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

  getStudentPdf(studentId: number) {
    this.studentService.getAlunoPdf(studentId).subscribe({
      next: async response => {
        const pdfUrl = URL.createObjectURL(response);
        this.openPdfModal(pdfUrl);
      },
      error: err => this.helperService.toast(err.error.message, 'warning')
    });
  }

  async openPdfModal(pdfUrl: string) {
    const modal = await this.modalController.create({
      component: StudentPdfComponent,
      componentProps: {
        pdfUrl: pdfUrl, // Pass the PDF URL as an input to the modal
      },
      cssClass: 'pdf-modal'
    });

    return await modal.present();
  }
}
