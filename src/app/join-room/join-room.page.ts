import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.page.html',
  styleUrls: ['./join-room.page.scss'],
})
export class JoinRoomPage implements OnInit {
 
  code: string

  constructor(private roomService: RoomService) {
    this.code = this.roomService.getRoomCode() 
  }

  ngOnInit() {
    this.roomService.getRoomByCode(this.code)
  }

}
