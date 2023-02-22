import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Confirm } from 'notiflix'
import { RoomService } from '../services/room.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mode = "default";
  isJoining: boolean = false
  hasJoined: boolean = false
  code: string = ""

  constructor(private roomService: RoomService, private router: Router, private storage: Storage) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        firstValueFrom(this.roomService.getActiveRoom()).then((c) => {
          if (c && c.code != null) {
            this.hasJoined = true;
          }
        })
        // if (firstValueFrom(this.roomService.getActiveRoom()))//you're in a room, then remove button lol!
      }
   });
  }

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
    console.log(await this.storage.get('last name'))
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
        );
    }
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
    this.router.navigate(["join-room"])
    this.isJoining = false
  }
}