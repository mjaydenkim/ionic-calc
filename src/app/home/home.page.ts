import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Subscription } from 'rxjs';
import { Confirm, Notify } from 'notiflix'
import { RoomService } from '../services/room.service'
import { StudentService } from '../services/student.service';

export interface HistoryEvent {
  timestamp?: string;
  equation: string;
  answer: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  mode = "default";
  isJoining: boolean = false
  hasJoined: boolean = false
  code: string = ""
  routerSub: Subscription
  roomSub: Subscription
  // history: could have an output var that calls a service in the home page. or could have separate services for both pages.

  constructor(private roomService: RoomService, private router: Router, private studentService: StudentService) {
    this.routerSub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.roomSub = this.roomService.getActiveRoom().subscribe((c) => {
          this.studentService.getActiveStudent().then((student) => {
            if (c && c.code && student && student.status != "inactive") {
              this.hasJoined = true;
              this.studentService.updateStatus("online")
            } else if (student?.status == "inactive") {
              console.log("inactive!")
              this.hasJoined = false
              this.studentService.setActiveStudent(null)
            }
          })
        })
      }
   }); 
  } // update this to be a subscription rather than using firstValueFrom. watch for changes so you can "log out" the user when they become inactive

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

  notify(message: string) {
    Notify.failure(message)
  }

  async ngOnInit() {
    let student = await this.studentService.getActiveStudent();
    this.code = student?.room?.code
    console.log(student)
    if (this.code != null && student.status != "inactive") {
      Confirm.show(
        'Previous Room',
        'Previously, ' + student.name + ' was in a room with code ' + this.code + '. Would you like to rejoin?',
        'Yes',
        'No',
        () => {
          this.existingJoin(student.name, student.email)
        },
      );
    }
  }

  newJoin() { // joining a new user w/ the join-room page. same as finishJoin()
    console.log("finished joining. code: " + this.code)
    if (this.code?.length && this.code.length == 4) {
      try {
        this.studentService.setActiveStudent(null)
        this.roomService.getRoomByCode(this.code).then((response) => {
          this.roomService.setRoomCode(this.code)
          this.router.navigate(["join-room"])
          this.isJoining = false
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      this.notify("Invalid code");
    }
  }

  async existingJoin(name: string, email: string) { // re-joining an existing user w/o using the join-room page
    console.log("finished joining. code: " + this.code)
    try {
      await this.roomService.getRoomByCode(this.code).then((response) => {console.log(response)})
      this.roomService.setRoomCode(this.code)
      this.isJoining = false
      this.hasJoined = true

      this.roomService.addStudentToRoom(name.split(" ")[0], name.split(" ")[name.split(" ").length - 1], email)
    } catch (e) {
      console.log(e)
    }
  }

  async handleHistoryChange(event: HistoryEvent) {
    const activeStudent = await this.studentService.getActiveStudent()
    if (activeStudent && activeStudent.id) {
      this.studentService.updateHistory(activeStudent, event)
    }
  }

  ngOnDestroy(): void {
      this.routerSub?.unsubscribe()
      this.roomSub?.unsubscribe()
  }
}