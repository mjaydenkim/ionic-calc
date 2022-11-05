import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import roomStore from '../../models/Room/store'

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id)

    this.roomSubscription = roomStore.getOne(this.id).subscribe((room) => {
      this.room = room
      console.log(this.room)
      this.students = room.student.items
    })
  }

  ngOnDestroy() {
    this.roomSubscription.unsubscribe()
  }

}
