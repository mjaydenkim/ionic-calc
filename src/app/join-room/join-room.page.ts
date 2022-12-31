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

  student = {
    firstName: "",
    lastName: "",
    studentEmail: ""
  }

  constructor(private roomService: RoomService, private router: Router) {
    this.code = this.roomService.getRoomCode() 
  }

  ngOnInit() {
    this.loadRoom()
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

  submit(event: any) {
    event.preventDefault()
    console.log(" First name: " + this.student.firstName + " Last name: " + this.student.lastName + " Student email: " + this.student.studentEmail)
    this.roomService.addStudentToRoom(this.student.firstName, this.student.lastName, this.student.studentEmail)
  }

  handleInputChange(event: any, varType: string) {
    this.student[varType] = event.target.value
  }

}
