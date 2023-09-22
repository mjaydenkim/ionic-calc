import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationStart } from '@angular/router';
import roomStore from 'src/models/Room/store';
import { Subscription, firstValueFrom, lastValueFrom } from 'rxjs'
import Room from 'src/models/Room'
import { Router } from '@angular/router'

import { Storage } from '@ionic/storage'

@Component({
  selector: 'student-history',
  templateUrl: './student-history.page.html',
  styleUrls: ['./student-history.page.scss'],
})
export class StudentHistoryPage implements OnInit, OnDestroy {

  id: string
  roomId: string
  student: any
  studentSub: Subscription
  routerSub: Subscription
  history: any[] = []

  constructor(private storage: Storage, private route: ActivatedRoute, private router: Router) {
    // route.params.subscribe()
    // inside the subscription, main argument coming into the subscription is an object w/ parameter id (coming from app routing module, line 41)
    // this.router.navigate(['/[path]', id]);

  //   this.routerSub = router.events.subscribe((event) => {
  //     if (event instanceof NavigationStart) {
  //       console.log("fjkgkfj")
  //       this.refresh()
  //     }
  // });
  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log("got the id: " + this.id)

    // firstValueFrom(roomStore.getActiveStudent()).then(
    //   async (student) => {
    //     console.log(student)
    //     if (!student) {
    //       await Room.load()

    //       console.log(this.id)
          
    //       firstValueFrom(roomStore.getOne(this.roomId)).then((room) => {
    //         console.log(room)
    //         roomStore.setAllStudents(room.student.items)
    //       })

    //       firstValueFrom(roomStore.getAllStudents()).then((students) => {
    //         console.log(students)
    //       })

    //       await roomStore.setActiveStudent(this.id)
    //       console.log(await firstValueFrom(roomStore.getActiveStudent()))
    //     }
    //   }
    // )

    this.studentSub = roomStore.getStudent(this.id).subscribe(student => {
      this.student = student
      console.log(student)

      // if (!student) {
      //   this.router.navigateByUrl('/home');
      //   this.studentSub.unsubscribe()
      // }

      this.history = this.student?.history?.reverse().map((historyItem: string) => {
        let parsedHistory = JSON.parse(historyItem)
        return {
          ...parsedHistory,
          timestamp: new Date(parsedHistory.timestamp).toLocaleString()
        }
      })
    })

    firstValueFrom(roomStore.getStudent(this.id)).then(student => {
      this.roomId = student.roomId
    })
  }

  async refresh() {
    await Room.load()
    console.log(this.roomId)
    firstValueFrom(roomStore.getOne(this.roomId)).then((room) => { // has to be room ode, not student!
      roomStore.setAllStudents(room?.student?.items)
    })
  }

  ngOnDestroy() {
    this.studentSub.unsubscribe()
    // this.routerSub.unsubscribe()
  }

}
