import { Injectable, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@capacitor/network';
import { API, graphqlOperation } from 'aws-amplify';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { CreateStudentMutation, Student } from 'src/API';
import { createStudent, updateStudent } from 'src/graphql/mutations';
import { getStudent } from 'src/graphql/queries';
import { PluginListenerHandle } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

type Status = "online" | "idle" | "offline" | "exited" | "inactive"

@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnDestroy {

  /** student statuses:
   * online: using calculator, on the page
   * idle: device is off, but the last app used was the calculator
   * offline: device has disconnected b/c of network issues
   * exited: not connecting to calculator (on another page/app, etc)
   * inactive: student has left room
   */

  liveActiveStudent: BehaviorSubject<Student> = new BehaviorSubject(null)
  networkListener: PluginListenerHandle
  visibilityListener: EventListener

  constructor(private storage: Storage) {
    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      if (status.connectionType == 'unknown' || status.connectionType == 'none') {
        this.updateStatus("offline")
      }
      console.log('Network status changed', status);
    });
    document.addEventListener("visibilitychange", this.visibilityListener = () => {
      if (!document.hasFocus) {
        this.updateStatus("exited")
      }
    })
    this.storage.create().then(() => {
      this.storage.get('student').then(
        (student) => {
          if (student) {
            this.liveActiveStudent.next(JSON.parse(student))
          }
          // this.activeStudent = JSON.parse(student)
        }
      )
    })
  }

  // activeStudent?: Student

  async createStudent(firstName: string, lastName: string, email: string, roomId: string): Promise<CreateStudentMutation["createStudent"]> {
    const response: any = await API.graphql({
      query: createStudent,
      authMode: 'AWS_IAM',
      variables: {
        input: {
          name: firstName + " " + lastName,
          email,
          status: "Offline",
          roomStudentId: roomId,
          roomId
        }
      }
    })
    // set active student to be response.data, resolve type conflicts
    this.setActiveStudent(response.data.createStudent)
    return response.data.createStudent
  }
  async findStudentById(id: string): Promise<Student> {
    const response: any = await API.graphql({
      query: getStudent,
      authMode: 'AWS_IAM',
      variables: {
        id
      }
    })
    return response.data.getStudent
  }
  findStudentByEmail(email: string): Promise<Student> {
    return new Promise(null)
  }
  setActiveStudent(student?: Student) {
    // sets active student, updates student in local storage
    if (!student) {
      this.storage.set('student', null)
    }
    this.liveActiveStudent.next(student)
    this.storage.set('student', JSON.stringify(student))
  }
  async getActiveStudent(): Promise<Student> {
    if (!this.liveActiveStudent.getValue()) {
      // this.storage.get('student').then(student => console.log(student))
      let activeStudent = JSON.parse(await this.storage.get('student'))
      console.log(activeStudent)
      return activeStudent
      // this.storage.get('student').then(
      //   (student) => {
      //     this.activeStudent = JSON.parse(student)
      //     console.log(this.activeStudent)
      //     return this.activeStudent
      //   }
      // )
    } else {
      return firstValueFrom(this.liveActiveStudent)
    }
  }
  async updateStatus(status: Status) {
    let activeStudent = this.liveActiveStudent.getValue()
    this.setActiveStudent({
      ...activeStudent,
      status
    })
    const updatedStudent: any = await API.graphql(graphqlOperation(updateStudent, {
      input: {
        id: activeStudent.id,
        status
      }
    }))
    this.setActiveStudent(updatedStudent?.data?.updateStudent)
  }
  exitRoom() {
    this.updateStatus("inactive")
  }
  ngOnDestroy(): void {
    console.log("student service destroyed")
    if (this.networkListener) {
      this.networkListener.remove();
    }
    document.removeEventListener("visibilitychange", this.visibilityListener) // todo: test this out w/ the teacher side, mockups w/ updates, testing
    // notify room that student is no longer active
    // update status to offline
  }

  
}
