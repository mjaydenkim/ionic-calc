import { Component, OnInit, OnDestroy } from '@angular/core';
import storeMethods from '../../models/Room/store'
import { v4 as uuid } from 'uuid'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  storeSubs: Subscription;

  createProctoringRoom() {
    console.log("proctoring room created")
    const id = uuid()
    storeMethods.addOne({
      id,
      name: "",
      students: []
    })
    storeMethods.setActive(id)
    this.router.navigate(
      ["room"]
    )
  }

}