import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ButtonEvent {
  lastFocusedId: string;
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalcButtonService {
  keySubject: BehaviorSubject<ButtonEvent> = new BehaviorSubject({lastFocusedId: '', key: ''})
  lastHistory: string[][] = [] // only stores calc 4f history

  constructor() { }

  notify(event: string) { // will take in key press
    this.keySubject.next({
      ...this.keySubject.getValue(),
      key: event
    })
  }

  listen() { // will return key press to any listening component
    return this.keySubject.asObservable()
  }

  getLastHistory() {
    return this.lastHistory
  }

  setLastHistory(nextHistory: string[][]) {
    console.log(nextHistory)
    this.lastHistory = nextHistory
  }

  setLastFocus(lastFocus: string) {
    this.keySubject.next({
      ...this.keySubject.getValue(),
      lastFocusedId: lastFocus
    })
  }
}