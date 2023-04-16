import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import roomStore from 'src/models/Room/store';
import { Subscription } from 'rxjs'

@Component({
  selector: 'student-history',
  templateUrl: './student-history.page.html',
  styleUrls: ['./student-history.page.scss'],
})
export class StudentHistoryPage implements OnInit, OnDestroy {

  id: string
  student: any
  studentSub: Subscription
  history: any[] = []

  constructor(private route: ActivatedRoute) {
    // route.params.subscribe()
    // inside the subscription, main argument coming into the subscription is an object w/ parameter id (coming from app routing module, line 41)
    // this.router.navigate(['/[path]', id]);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id)
    this.studentSub = roomStore.getActiveStudent().subscribe(student => {
      this.student = student
      this.history = this.student?.history?.reverse().map((historyItem: string) => {
        let parsedHistory = JSON.parse(historyItem)
        return {
          ...parsedHistory,
          timestamp: new Date(parsedHistory.timestamp).toLocaleString()
        }
      })
    })
  }

  ngOnDestroy() {
    this.studentSub.unsubscribe()
  }

}
