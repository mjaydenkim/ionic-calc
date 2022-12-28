import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Room } from 'src/API';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.page.html',
  styleUrls: ['./join-room.page.scss'],
})
export class JoinRoomPage implements OnInit {
 
  code: string = ""
  room: Room

  constructor(private roomService: RoomService, private router: Router) {
    this.code = this.roomService.getRoomCode() 
  }

  async loadRoom() {
    this.room = await firstValueFrom(this.roomService.getActiveRoom())
  }
  
  getRoomDate() {
    return new Date (this.room?.createdAt).toLocaleString()
  }

  goBack() {
    this.router.navigate([".."])
  }

  ngOnInit() {
    this.loadRoom()
  }

}
