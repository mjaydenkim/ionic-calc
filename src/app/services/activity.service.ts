import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { Subscription } from 'rxjs';
import { OnCreateStudentSubscription } from 'src/API';
import { onCreateStudent } from 'src/graphql/subscriptions';
import roomStore from 'src/models/Room/store';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  roomObservable: any = null
  roomSubscription: Subscription = null

  constructor() { }

  initRoomSubscription(roomId: string) {
    console.log("initializing subscription to room: " + roomId)

    this.unsubscribeRoom()

    this.roomObservable = API.graphql(graphqlOperation(onCreateStudent
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
          if (newStudent) {
            roomStore.addStudentToRoom(newStudent)
            // add new student to active room
          }
        }, // update room info in store
        error: (e) => { console.log(e) }
      })
    }
    return this.roomSubscription
  }

  unsubscribeRoom() {
    this.roomSubscription?.unsubscribe()
    this.roomSubscription = null
  }

}
