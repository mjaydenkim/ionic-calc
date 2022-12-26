import { Component, OnInit } from '@angular/core';
import { Room } from 'src/API';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.page.html',
  styleUrls: ['./join-room.page.scss'],
})
export class JoinRoomPage implements OnInit {
 
  code: string = ""
  room: any

  constructor(private roomService: RoomService) {
    this.code = this.roomService.getRoomCode() 
    this.loadRoom()
  }

  async loadRoom() {
    await this.roomService.getRoomByCode(this.code).then((room) => {this.room = room})
  }

  ngOnInit() {}

}
