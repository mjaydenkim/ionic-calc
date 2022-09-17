import { Component, OnInit, OnDestroy } from '@angular/core';
import storeMethods from '../../models/Room/store'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.page.html',
  styleUrls: ['./room-list.page.scss'],
})
export class RoomListPage implements OnInit, OnDestroy {

  rooms: any[] = []
  roomSub: Subscription

  constructor() { }

  ngOnInit() {
    // do what we did in the home page (getall) --> updating a local variable within the component
      // unsub once component is destroyed
    this.roomSub = storeMethods.getAll().subscribe(
      (rooms) => {
        this.rooms = rooms
      }
    )
  }

  ngOnDestroy() {
    this.roomSub.unsubscribe()
  }

}
