import { Component, OnInit } from '@angular/core';
import Room from '../../models/Room'

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {

  constructor() { }

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
      console.log(newRoom) // code isn't updated
    })
  }
}
