import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalcButtonService {
  keySubject: Subject<string> = new Subject()
  lastHistory: string[][] = []

  constructor() { }

  notify(event: string) { // will take in key press
    this.keySubject.next(event)
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
}