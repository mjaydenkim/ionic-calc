import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Room } from 'src/API';
import { RoomService } from '../services/room.service';
import { Storage } from '@ionic/storage'
@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.page.html',
  styleUrls: ['./join-room.page.scss'],
})
export class JoinRoomPage implements OnInit {
 
  code: string = ""
  room: Room

  firstName: string = ""
  lastName: string = ""
  studentEmail: string = ""

  constructor(private roomService: RoomService, private router: Router) {
    this.roomService.getRoomCode().then(
      (code) => {
        this.code = code
      }
    )
  }

  async ngOnInit() {
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

  async submit(event: any) {
    event.preventDefault()
    console.log(" First name: " + this.firstName + " Last name: " + this.lastName + " Student email: " + this.studentEmail)
    this.roomService.addStudentToRoom(this.firstName, this.lastName, this.studentEmail).then( // explicitly check whether or not the name, email match!
      () => {
        this.router.navigate(["home"])
      }
    )
  }

  handleFirstNameChange(event: any) {
    this.firstName = event.target.value
  }

  handleLastNameChange(event: any) {
    this.lastName = event.target.value
  }

  handleEmailChange(event: any) {
    this.studentEmail = event.target.value
  }
}
