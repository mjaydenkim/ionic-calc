import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusIndicatorComponent } from './status-indicator/status-indicator.component';
import { CreateRoomButtonComponent } from './create-room-button/create-room-button.component';



@NgModule({
  declarations: [
    StatusIndicatorComponent,
    CreateRoomButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatusIndicatorComponent,
    CreateRoomButtonComponent
  ]
})
export class ComponentsModule { }
