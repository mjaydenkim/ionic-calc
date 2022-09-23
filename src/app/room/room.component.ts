import { Component, OnInit } from '@angular/core';
import storeMethods from '../../models/Room/store'
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
    console.log("Creating a room with name: " + this.name)
    event.preventDefault() 
  }

}
