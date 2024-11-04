import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessorPageRoutingModule } from './professor-routing.module';

import { ProfessorPage } from './professor.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProfessorPage]
})
export class ProfessorPageModule {}
