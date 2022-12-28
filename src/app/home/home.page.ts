import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RoomService } from '../services/room.service';
import { Storage } from '@ionic/storage';
import { Confirm } from 'notiflix'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mode = "default";
  isJoining: boolean = false
  code: string = ""

  constructor(private roomService: RoomService, private router: Router, private storage: Storage) {}

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

  async ngOnInit() {
    await this.storage.create();
    this.code = await this.storage.get('room code')
    console.log(this.code)
    if (this.code != null) {
      Confirm.show(
        'Previous Room',
        'Previously, you were in a room with code ' + this.code + '. Would you like to rejoin?',
        'Yes',
        'No',
        () => {
          this.finishJoin()
        },
        // () => {
        //   console.log("ok lol")
        // },
        // {
        // },
        );
    }
  }

  async finishJoin() {
    console.log("finished joining. code: " + this.code)
    await this.storage.set('room code', this.code);
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
    this.router.navigate(["join-room"])
    this.isJoining = false
  }
}