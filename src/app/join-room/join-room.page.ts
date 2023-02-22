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
  id: string = ""

  constructor(private roomService: RoomService, private router: Router, private storage: Storage) {
    this.code = this.roomService.getRoomCode() 
  }

  async ngOnInit() {
    // this.firstName = await this.storage.get('first name')
    // this.lastName = await this.storage.get('last name')
    // this.studentEmail = await this.storage.get('student email')
    // if (this.firstName != null && this.lastName != null && this.studentEmail != null) {
    //   this.roomService.addStudentToRoom(this.firstName, this.lastName, this.studentEmail).then(
    //     (student) => {
    //       console.log(student)
    //       this.storage.set('student id', this.id)
    //       // this.router.navigate(["home"]) // TODO: check if a user with this information already exists. if so, log into that account. 
    //     }
    //   )
    // }
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
    console.log(" First name: " + this.firstName + " Last name: " + this.lastName + " Student email: " + this.studentEmail + " ID: " + this.id)
    this.roomService.addStudentToRoom(this.firstName, this.lastName, this.studentEmail).then( // explicitly check whether or not the name, email match!
      async (student) => {
        this.id = student.id
        await this.storage.set('student id', this.id)
        await this.storage.set('first name', this.firstName)
        await this.storage.set('last name', this.lastName)
        await this.storage.set('student email', this.studentEmail)
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
