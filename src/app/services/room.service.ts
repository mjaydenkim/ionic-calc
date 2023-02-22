import { Injectable } from '@angular/core';
import API, { graphqlOperation } from '@aws-amplify/API'
import { Storage } from '@ionic/storage-angular';
import Notiflix, { Notify } from 'notiflix';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { CreateStudentMutation, Room, Student, UpdateStudentMutation } from 'src/API';
import { createStudent, updateStudent } from 'src/graphql/mutations';
import { getRoomByCode, getStudent } from 'src/graphql/queries';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  roomSubject: BehaviorSubject<any> = new BehaviorSubject({
    active: null,
    activeStudent: null,
    code: ""
  })

  constructor(private storage: Storage) { }
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
        active: response && response.data && response.data.getRoomByCode && response.data.getRoomByCode.items && response.data.getRoomByCode.items[0]
      })
      await this.storage.set('room code', response.data.getRoomByCode.items[0].code)
      return response && response.data && response.data.getRoomByCode && response.data.getRoomByCode.items && response.data.getRoomByCode.items[0]
      // set active room based on response
    } catch (e) {
      console.log(e)
    }
  }
  getActiveRoom(): Observable<Room> {
    return this.roomSubject.asObservable().pipe(
      map(store => store.active)
    );
  }
  async createStudent(firstName: string, lastName: string, email: string, roomId: string): Promise<CreateStudentMutation> {
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
    return response.data
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
  async addStudentToRoom(firstName: string, lastName: string, email: string): Promise<Partial<CreateStudentMutation['createStudent']>> {
    // query room to test if student exists -- might need to allow querying student by email
    const room: Room = await firstValueFrom(this.getActiveRoom())
    const roomId: string = room?.id
    const studentId = await this.storage.get('student id') // TODO: new student or existing student?????
    const savedFirstName = await this.storage.get('first name')
    const savedLastName = await this.storage.get('last name')
    const savedEmail = await this.storage.get('student email')
    // call findStudentByEmail(email); once you get the student, add to room
    // add if/else to see if student exists or if they're new  
    const student = await this.findStudentById(studentId)
    console.log(firstName + " " + savedFirstName)
    if (studentId && firstName == savedFirstName && lastName == savedLastName && email == savedEmail) { // email should be unique. use notify to communicate to user that an email already exists, etc
      const currentInfo = this.roomSubject.getValue()
      this.roomSubject.next({
        active: currentInfo.active,
        activeStudent: student,
        code: currentInfo.code,
      })
      return new Promise(
        (resolve) => {
          return resolve(student)
        }
      ) // why is id null lol!?
    } else {
      return this.createStudent(firstName, lastName, email, roomId).then(
        (studentMutation): CreateStudentMutation['createStudent'] => {
          const currentInfo = this.roomSubject.getValue()
          this.roomSubject.next({
            active: currentInfo.active,
            activeStudent: studentMutation.createStudent, // TODO: play around with this, fix bugs, etc. will meet l8r
            code: currentInfo.code,
          })
          return studentMutation.createStudent
      })
    }
  }
  // leave room
  // update student status
  // listen to activity changes
  // confirm join
}
