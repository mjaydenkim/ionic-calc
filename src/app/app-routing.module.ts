import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { JoinRoomGuard } from './guards/join-room.guard';
import { HomePageModule } from './home/home.module';
import { JoinRoomPage } from './join-room/join-room.page';

const routes: Routes = [
  {
    path: 'join-room',
    component: JoinRoomPage,    
    canActivate: [JoinRoomGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
