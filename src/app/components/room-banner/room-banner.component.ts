import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'room-banner',
  templateUrl: './room-banner.component.html',
  styleUrls: ['./room-banner.component.scss'],
})
export class RoomBannerComponent implements OnInit {

  name: string = ""

  constructor(private studentService: StudentService, private roomService: RoomService) { }

  async ngOnInit() {
    this.name = (await this.studentService.getActiveStudent()).name
  }

  async handleLeaveRoom() {
    this.studentService.updateStatus("inactive")
    this.roomService.setActiveRoom(null)
    console.log(await this.studentService.getActiveStudent())
  }

}
