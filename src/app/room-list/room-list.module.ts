import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomListPageRoutingModule } from './room-list-routing.module';

import { RoomListPage } from './room-list.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomListPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RoomListPage],
})
export class RoomListPageModule {}
