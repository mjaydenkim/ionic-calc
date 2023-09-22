import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular'
import { AuthenticatorService } from '@aws-amplify/ui-angular'
import { Auth } from 'aws-amplify'

import storeMethods from '../../models/Room/store'
import Room from 'src/models/Room';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.page.html',
  styleUrls: ['./room-list.page.scss'],
})
export class RoomListPage implements OnInit, OnDestroy {

  rooms: any[] = []
  roomSub: Subscription

  constructor(public router: Router, private storage: Storage, private authenticator: AuthenticatorService) {
    this.storage.create()
  }

  ngOnInit() {
    // do what we did in the home page (getall) --> updating a local variable within the component
    // unsub once component is destroyed
    Room.load()
    this.roomSub = storeMethods.getAll().subscribe(
      (rooms) => {
        Auth.currentAuthenticatedUser().then((user) => {
          console.log(user.username)
          this.rooms = rooms.filter(({ teacherRoomId }) => {
            if (teacherRoomId && teacherRoomId === user?.username) {
              return true;
            }
            return false;
          })
        })
      })
  }
  selectRow(index: number) {
    console.log(this.rooms[index])
    this.router.navigateByUrl("/room/" + this.rooms[index].id)
  }

  logout() {
    this.authenticator.signOut()
    this.router.navigateByUrl("/auth")
  }

  ngOnDestroy() {
    this.roomSub.unsubscribe()
  }

}
