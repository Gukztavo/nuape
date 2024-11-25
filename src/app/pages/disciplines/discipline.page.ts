import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { DisciplineService } from 'src/app/services/discipline.service';
import { DisciplineModel } from 'src/app/model/discipline.model';
import { ModalController } from '@ionic/angular';
import { DisciplineDialogComponent } from './disciplines-dialog/discipline-dialog.component';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.page.html',
  styleUrls: ['./discipline.page.scss'],
})
export class DisciplinePage implements OnInit {

  disciplines: DisciplineModel[] = [];

  pdfUrl: string | undefined;

  constructor(
    private disciplineService: DisciplineService,
    private modalController: ModalController,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.getAllDisciplines();
  }

  getAllDisciplines(): void {
    this.disciplineService.getAll().subscribe({
      next: res => this.disciplines = res
    });
  }

  deleteDiscipline(disciplineId: number) {
    this.disciplineService.delete(disciplineId).subscribe({
      next: res => {
        this.helperService.toast(res.message, 'success');
        // this.disciplines = this.disciplines.filter(s => s.id !== disciplineId);
      },
      error: () => this.helperService.toast("Erro ao excluir aluno, tente novamente", 'danger')
    });
  }

  async openDisciplineModal(discipline?: DisciplineModel) {
    const modal = await this.modalController.create({
      component: DisciplineDialogComponent,
      componentProps: {
        discipline: discipline || null
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.getAllDisciplines();
      }
    });

    return await modal.present();
  }
}
