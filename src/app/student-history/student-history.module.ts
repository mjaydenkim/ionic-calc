import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentHistoryPageRoutingModule } from './student-history-routing.module';

import { StudentHistoryPage } from './student-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentHistoryPageRoutingModule
  ],
  declarations: [StudentHistoryPage]
})
export class StudentHistoryPageModule {}
