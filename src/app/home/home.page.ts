import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mode = "default";
  isJoining: boolean = false
  code: string = ""

  constructor() {}

  changeMode() {
    if (this.mode == "default") {
      this.mode = "graphing"
    } else {
      this.mode = "default"
    }
  }

  joinRoom() {
    // change state of ui
    this.isJoining = true
  }

  finishJoin() {
    console.log("finished joining. code: " + this.code)
    this.isJoining = false
  }
}