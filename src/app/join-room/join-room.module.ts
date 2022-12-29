import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinRoomPage } from './join-room.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    IonicModule,
  ],
  declarations: [JoinRoomPage],
  exports: [JoinRoomPage]
})
export class JoinRoomPageModule {}
