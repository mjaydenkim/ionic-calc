import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import storeMethods from '../../models/Room/store'
import { map } from 'rxjs/operators'

import Room from '../../models/Room'

@Injectable({
  providedIn: 'root'
})
export class HomeGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // return storeMethods.getAll().pipe(
    return Room.load().then((rooms: any[]) => {
          if (rooms && rooms.length) {
            return this.router.parseUrl("/room-list");
          }
          return true
        }
      )
  }
}
