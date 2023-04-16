import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomDetailPage } from './room-detail.page';
import { StudentHistoryPageModule } from '../student-history/student-history.module';
import { KatexModule } from 'ng-katex';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentHistoryPageModule,
  ],
  declarations: [RoomDetailPage],
  exports: [
    RoomDetailPage
  ]
})
export class RoomDetailPageModule {}
