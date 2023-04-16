import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentHistoryPageRoutingModule } from './student-history-routing.module';

import { StudentHistoryPage } from './student-history.page';

import { KatexModule } from 'ng-katex' 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentHistoryPageRoutingModule,
    KatexModule
  ],
  declarations: [StudentHistoryPage]
})
export class StudentHistoryPageModule {}
