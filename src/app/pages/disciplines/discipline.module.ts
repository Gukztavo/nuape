import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { DisciplinePageRoutingModule } from './discipline-routing.module';
import { DisciplinePage } from './discipline.page';
import { DisciplineDialogComponent } from './disciplines-dialog/discipline-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisciplinePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DisciplinePage, DisciplineDialogComponent]
})
export class DisciplinePageModule {}
