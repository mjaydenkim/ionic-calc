import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CalcButtonComponent } from '../calc-button/calc-button.component';
import { CalcGraphingComponent } from '../calc-graphing/calc-graphing.component';
import { CalcFourFunctionComponent } from '../calc-four-function/calc-four-function.component';
import { CalcButtonLayoutComponent } from '../calc-button-layout/calc-button-layout.component';
import { KatexModule } from 'ng-katex';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    KatexModule,
  ],
  declarations: [HomePage, CalcButtonComponent, CalcGraphingComponent, CalcFourFunctionComponent, CalcButtonLayoutComponent]
})
export class HomePageModule {}
