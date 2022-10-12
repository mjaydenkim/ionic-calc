import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeGuardService } from './home/home-guard.service';
import { RoomGuardService } from './room-guard.service';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [HomeGuardService]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'room',
    component: RoomComponent,
    canActivate: [RoomGuardService]
  },
  {
    path: 'room-list',
    loadChildren: () => import('./room-list/room-list.module').then( m => m.RoomListPageModule)
  },  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [RoomComponent]