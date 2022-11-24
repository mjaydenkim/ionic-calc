import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  roomSubject: BehaviorSubject<any> = new BehaviorSubject({
    active: null,
    code: ""
  })

  constructor() { }
  // set room code *
  setRoomCode(code: string) {
    const currentInfo = this.roomSubject.getValue()
    this.roomSubject.next({
      active: currentInfo.active,
      code,
    })
  }
  // get room code *
  getRoomCode(): string {
    return this.roomSubject.getValue().code
  }
  // get room by code *
  getRoomByCode(code: string) {
    console.log(code)
  }
  // leave room
  // update student status
  // listen to activity changes
  // confirm join
}
