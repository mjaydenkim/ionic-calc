import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { Subscription } from 'rxjs';
import { OnCreateStudentSubscription } from 'src/API';
import { onCreateStudent, onUpdateStudent } from 'src/graphql/subscriptions';
import roomStore from 'src/models/Room/store';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  roomObservable: any = null
  studentObservable: any = null
  roomSubscription: Subscription = null

  constructor() { }

  initRoomSubscription(roomId: string) {
    console.log("initializing subscription to room: " + roomId)

    this.unsubscribeRoom()

    this.roomObservable = API.graphql(graphqlOperation(onCreateStudent // see if filter functionality has been fixed by amplify v5
    //   {
    //   // filter: {
    //   //   roomId: { eq: roomId }
    //   // }
    // }
    ))
    if (!this.roomSubscription) {
      this.roomSubscription = this.roomObservable.subscribe({
        next: ({ value }) => {
          let newStudent: OnCreateStudentSubscription['onCreateStudent'] = value?.data?.onCreateStudent;
          console.log(value)
          if (newStudent && newStudent.roomId === roomId) {
            roomStore.addStudentToRoom(newStudent)
            // add new student to active room
          }
        }, // update room info in store
        error: (e) => { console.log(e) }
      })
    }
    return this.roomSubscription
  }

  initStudentSubscription(studentId: string) {
    this.studentObservable = API.graphql(graphqlOperation(onUpdateStudent, 
      {
        filter: {
          id: { eq: studentId }
        }
      })
    )
  }

  unsubscribeRoom() {
    this.roomSubscription?.unsubscribe()
    this.roomSubscription = null
  }

}
