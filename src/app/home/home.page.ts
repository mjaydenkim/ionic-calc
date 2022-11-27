import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  finishJoin() {
    console.log("finished joining. code: " + this.code)
    this.roomService.setRoomCode(this.code)
    this.router.navigate(["join-room"])
    this.isJoining = false
  }
}