import { Injectable } from '@angular/core';
import API, { graphqlOperation } from '@aws-amplify/API'
import { Storage } from '@ionic/storage-angular';
import Notiflix, { Notify } from 'notiflix';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { CreateStudentMutation, Room, Student, UpdateStudentMutation } from 'src/API';
import { createStudent, updateStudent } from 'src/graphql/mutations';
import { getRoomByCode, getStudent } from 'src/graphql/queries';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  roomSubject: BehaviorSubject<any> = new BehaviorSubject({
    active: null,
    code: ""
  })

  constructor(private storage: Storage, private studentService: StudentService) { }
  setRoomCode(code: string) {
    const currentInfo = this.roomSubject.getValue()
    this.roomSubject.next({
      active: currentInfo.active,
      code,
    })
  }
  getRoomCode(): Promise<string> {
    const roomCode = this.roomSubject.getValue().code
    if (roomCode) {
      return new Promise((resolve) => resolve(roomCode))
    } else {
      return this.storage.get('room code')
    }
  }
  async getRoomByCode(code: string): Promise<Partial<Room>> {
    console.log(code)
    try {
      const response: any = await API.graphql({
        query: getRoomByCode,
        authMode: 'AWS_IAM',
        variables: {
          code
        }
      })
      console.log(response)
      this.setActiveRoom(response?.data?.getRoomByCode?.items[0])
      return response && response.data && response.data.getRoomByCode && response.data.getRoomByCode.items && response.data.getRoomByCode.items[0]
    } catch (e) {
      console.log(e)
    }
  }
  async setActiveRoom(room?: Room) {
    if (room) {
      this.roomSubject.next({
        active: room,
        code: room.code
      })
      await this.storage.set('room code', room.code) // could store entire room instead. should isolate storage retrieval/set to services
    } else {
      this.roomSubject.next({
        active: room
      })
      await this.storage.set('room code', null)
    }
  }
  getActiveRoom(): Observable<Room> {
    return this.roomSubject.asObservable().pipe(
      map(store => store.active)
    );
  }
  async addStudentToRoom(firstName: string, lastName: string, email: string): Promise<Partial<CreateStudentMutation['createStudent']>> {
    const room: Room = await firstValueFrom(this.getActiveRoom())
    const roomId: string = room?.id
    const student = await this.studentService.getActiveStudent()
    if (student && student.id && firstName == student.name.split(" ")[0] && lastName == student.name.split(" ")[student.name.split(" ").length - 1] && email == student.email) { 
      // email should be unique. use notify to communicate to user that an email already exists, etc
      return new Promise(
        (resolve) => {
          return resolve(student)
        }
      )
    } else {
      return this.studentService.createStudent(firstName, lastName, email, roomId)
    }
  }
}
