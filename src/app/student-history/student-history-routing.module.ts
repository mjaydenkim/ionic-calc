import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentHistoryPage } from './student-history.page';

const routes: Routes = [
  {
    path: '',
    component: StudentHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentHistoryPageRoutingModule {}
