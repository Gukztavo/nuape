import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentPageRoutingModule } from './student-routing.module';
import { StudentPage } from './student.page';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StudentPage, StudentDialogComponent]
})
export class StudentPageModule {}
