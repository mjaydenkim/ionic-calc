import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, firstValueFrom } from 'rxjs';

import roomStore from '../../models/Room/store'
import Room from '../../models/Room'
import { ActivityService } from '../services/activity.service';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.page.html',
  styleUrls: ['./room-detail.page.scss'],
})
export class RoomDetailPage implements OnInit, OnDestroy {

  id: string
  room: any = {}
  students: any[] = []
  roomSubscription: Subscription

  constructor(private router: Router, private route: ActivatedRoute, private activity: ActivityService, private storage: Storage) {}

  async ngOnInit() {
    await Room.load()

    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id)

    this.roomSubscription = roomStore.getOne(this.id).subscribe((room) => {
      this.room = room
      console.log(this.room)
      this.students = room.student.items
    })
    roomStore.setAllStudents(this.students)

    this.activity.initRoomSubscription(this.id)
  }

  ngOnDestroy() {
    this.roomSubscription.unsubscribe()
    this.activity.unsubscribeRoom()
  }

  async refresh() {
    await Room.load()
    firstValueFrom(roomStore.getOne(this.id)).then((room) => { // has to be room ode, not student!
      roomStore.setAllStudents(room?.student?.items)
    })
  }

  handleClick(id: string) {
    console.log(id)
    roomStore.setActiveStudent(id)
    this.router.navigate(['/student-history/', id])
  }

  goBack() {
    this.router.navigate([".."])
  }

}
