import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
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
    return this.roomService.getActiveRoom().pipe(map(room => room ? true : this.router.parseUrl("/home"))); // true if exists, false if not
  }
  
}
