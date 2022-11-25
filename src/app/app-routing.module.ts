import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeGuardService } from './home/home-guard.service';
import { RoomDetailPage } from './room-detail/room-detail.page';
import { RoomGuardService } from './room-guard.service';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [HomeGuardService],
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'room/:id',
    component: RoomDetailPage
    // loadChildren: () => import('./room-detail/room-detail.module').then( m => m.RoomDetailPageModule)
  },
  {
    path: 'room',
    component: RoomComponent,
    canActivate: [RoomGuardService],
    pathMatch: 'full'
  },
  {
    path: 'room-list',
    loadChildren: () => import('./room-list/room-list.module').then( m => m.RoomListPageModule),
    pathMatch: 'full'
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [RoomComponent]