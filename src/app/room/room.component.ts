import { Component, OnInit } from '@angular/core';
import Room from '../../models/Room'
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  name: string = ""

  updateName(event: any) {
    console.log(event)
    this.name = event.target.value
  }

  handleSubmit(event: any) {
    event.preventDefault() 
    console.log("Creating a room with name: " + this.name)
    // TODO: Backend
    // const roomResults: any = await API.graphql(graphqlOperation(createRoom, {name: this.name}))
    // console.log(roomResults)
    // frontend only
    Room.create(this.name).then((newRoom) => {
      console.log(newRoom)
      this.router.navigate(["room", newRoom.id])
    })
  }

  goBack() {
    this.router.navigate([".."])
  }
}
