import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomBannerComponent } from './room-banner/room-banner.component';
import { CalcGraphDisplayComponent } from './calc-graph-display/calc-graph-display.component';
import { KatexModule } from 'ng-katex';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [RoomBannerComponent, CalcGraphDisplayComponent],
  imports: [
    CommonModule,
    KatexModule,
    FormsModule
  ],
  exports: [
    RoomBannerComponent,
    CalcGraphDisplayComponent
  ]
})
export class ComponentsModule {}
