import { Component, OnInit } from '@angular/core';
import storeMethods from '../../models/Room/store'

import { API, graphqlOperation } from 'aws-amplify'
import { createRoom } from 'src/graphql/mutations';

import { v4  as uuid } from 'uuid'

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

  async handleSubmit(event: any) {
    event.preventDefault() 
    console.log("Creating a room with name: " + this.name)
    // TODO: Backend
    // const roomResults: any = await API.graphql(graphqlOperation(createRoom, {name: this.name}))
    // console.log(roomResults)
    // frontend only
    let room = {
      id: uuid(),
      name: this.name,
      code: "test code" // nanoId
    }
  }
}
