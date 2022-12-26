import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mode = "default";
  isJoining: boolean = false
  code: string = ""

  constructor(private roomService: RoomService, private router: Router) {}

  changeMode() {
    if (this.mode == "default") {
      this.mode = "graphing"
    } else {
      this.mode = "default"
    }
  }

  joinRoom() {
    // change state of ui
    this.isJoining = true
  }

  async finishJoin() {
    console.log("finished joining. code: " + this.code)
    try {
      await this.roomService.getRoomByCode(this.code).then((response) => {console.log(response)})
    } catch (e) {
      console.log(e)
    }
    this.roomService.setRoomCode(this.code)

    // const currentInfo = this.roomService

    // roomSubject.next({
    //   active: currentInfo.active,
    //   code: this.code,
    // })
    this.router.navigateByUrl("join-room")
    this.isJoining = false
  }
}