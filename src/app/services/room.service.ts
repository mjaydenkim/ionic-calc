import { Injectable } from '@angular/core';
import API, { graphqlOperation } from '@aws-amplify/API'
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Room } from 'src/API';
import { getRoomByCode } from 'src/graphql/queries';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  roomSubject: BehaviorSubject<any> = new BehaviorSubject({
    active: null,
    code: ""
  })

  constructor() { }
  // set room code *
  setRoomCode(code: string) {
    const currentInfo = this.roomSubject.getValue()
    this.roomSubject.next({
      active: currentInfo.active,
      code,
    })
  }
  // get room code *
  getRoomCode(): string {
    return this.roomSubject.getValue().code
  }
  // get room by code *
  async getRoomByCode(code: string) {
    console.log(code)
    try { // when running graphql query, amplify uses cognito by default. i have to specify iam usage in the query. fix this
      const response: any = await API.graphql({
        query: getRoomByCode,
        authMode: 'AWS_IAM',
        variables: {
          code
        }
      })
      console.log(response)
      this.roomSubject.next({
        active: response
      })
      return response
      // set active room based on response
    } catch (e) {
      console.log(e)
    }
  }
  getActiveRoom(): Observable<any> { // TODO: Observable<Room>
    return this.roomSubject.asObservable().pipe(
      map(store => store.active)
    );
  }
  // leave room
  // update student status
  // listen to activity changes
  // confirm join
}
