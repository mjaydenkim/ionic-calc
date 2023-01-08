import { Component, OnInit } from '@angular/core';
import storeMethods from '../../../models/Room/store'
import { v4 as uuid } from 'uuid'
import { Router } from '@angular/router';

@Component({
  selector: 'create-room-button',
  templateUrl: './create-room-button.component.html',
  styleUrls: ['./create-room-button.component.scss'],
})
export class CreateRoomButtonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  createProctoringRoom() {
    console.log("proctoring room created")
    const id = uuid()
    storeMethods.addOne({
      id,
      name: "",
      students: {
        items: []
      }
    })
    storeMethods.setActive(id)
    this.router.navigate(
      ["room"]
    )
  }

}
