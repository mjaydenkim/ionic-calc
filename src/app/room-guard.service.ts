import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import storeMethods from '../models/Room/store'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RoomGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return storeMethods.getActive().pipe(
      map(
        (activeRoom) => {
          if (activeRoom) {
            return true;
          }
          return this.router.parseUrl("/home")
        }
      )
    )
  }
}
