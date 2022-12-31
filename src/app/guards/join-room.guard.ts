import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { e } from 'mathjs';
import { Notify } from 'notiflix';
import { map, Observable } from 'rxjs';
import { RoomService } from '../services/room.service';

@Injectable({
  providedIn: 'root'
})
export class JoinRoomGuard implements CanActivate {

  constructor(private roomService: RoomService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.roomService.getActiveRoom().pipe(map(room => {
      if(room && room.id) {
          return true;
        } else {
          Notify.failure("Invalid code");
          return this.router.parseUrl("/home");
        }
      }
      ));
  }
  
}
