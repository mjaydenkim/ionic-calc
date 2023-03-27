import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomBannerComponent } from './room-banner/room-banner.component';



@NgModule({
  declarations: [RoomBannerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    RoomBannerComponent
  ]
})
export class ComponentsModule {}
