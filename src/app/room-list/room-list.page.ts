import { Component, OnInit, OnDestroy } from '@angular/core';
import storeMethods from '../../models/Room/store'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';
import Room from 'src/models/Room';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.page.html',
  styleUrls: ['./room-list.page.scss'],
})
export class RoomListPage implements OnInit, OnDestroy {

  rooms: any[] = []
  roomSub: Subscription

  constructor(public router: Router) { }

  ngOnInit() {
    // do what we did in the home page (getall) --> updating a local variable within the component
      // unsub once component is destroyed
    Room.load()
    this.roomSub = storeMethods.getAll().subscribe(
      (rooms) => {
        this.rooms = rooms
      }
    )
  }

  selectRow(index: number) {
    console.log(this.rooms[index])
    this.router.navigateByUrl("/room/" + this.rooms[index].id)
  }

  ngOnDestroy() {
    this.roomSub.unsubscribe()
  }

}
