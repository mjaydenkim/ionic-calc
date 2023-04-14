import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'student-history',
  templateUrl: './student-history.page.html',
  styleUrls: ['./student-history.page.scss'],
})
export class StudentHistoryPage implements OnInit {

  @Input() student: any;

  constructor(private route: ActivatedRoute) {
    // route.params.subscribe()
    // inside the subscription, main argument coming into the subscription is an object w/ parameter id (coming from app routing module, line 41)
    // this.router.navigate(['/[path]', id]);
  }

  ngOnInit() {
    console.log(this.student)
  }

}
