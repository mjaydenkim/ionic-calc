import { BehaviorSubject, Observable } from 'rxjs'
import { map, first, last } from 'rxjs/operators'
import { Room, Student } from 'src/API';

const defaultStore = {
    active: null,
    all: {}, // all is a key-value pair of room ID -- room properties. should be able to look up a room by its ID, get students as property
    activeStudent: null,
    allStudents: {}
}

export const fakeStore = {
    active: "1024",
    all: {
        1024: {
            id: "1024",
            code: "ab12",
            name: "First Room",
            student: {
                items: [{
                    id: "1",
                    name: "Student 1",
                    email: "a@b.com",
                    status: "Online",
                    updatedAt: Date.now().toLocaleString()
                }]
            },
            teacher: {
                id: "1",
                name: "Teacher Name",
                email: "b@c.com",
                updatedAt: Date.now().toLocaleString()
            },
            status: "Offline"
        },
        2048: {
            id: "2048",
            code: "cd34",
            name: "Second Room",
            student: {
                items: [{
                    id: "2",
                    name: "Student 2",
                    email: "c@d.com",
                    status: "Away",
                    updatedAt: Date.now().toLocaleString()
                }]
            },
            teacher: {
                id: "2",
                name: "Teacher 2 Name",
                email: "d@e.com",
                updatedAt: Date.now().toLocaleString()
            },
            status: "Online"
        },
        4096: {
            id: "4096",
            code: "ef56",
            name: "Third Room",
            student: {
                items: [{
                    id: "3",
                    name: "Student 3",
                    email: "e@f.com",
                    status: "Offline",
                    updatedAt: Date.now().toLocaleString()
                }, {
                    id: "4",
                    name: "Student 4",
                    email: "f@g.com",
                    status: "Online",
                    updatedAt: Date.now().toLocaleString()
                }]
            },
            teacher: {
                id: "3",
                name: "Teacher 3 Name",
                email: "g@h.com",
                updatedAt: Date.now().toLocaleString()
            },
            status: "Online"
        },
        8192: {
            id: "8192",
            code: "gh78",
            name: "Fourth Room",
            student: {
                items: [{
                    id: "3",
                    name: "Student 3",
                    email: "e@f.com",
                    status: "Offline",
                    updatedAt: Date.now().toLocaleString()
                }, {
                    id: "4",
                    name: "Student 4",
                    email: "f@g.com",
                    status: "Online",
                    updatedAt: Date.now().toLocaleString()
                }, {
                    id: "5",
                    name: "Student 5",
                    email: "f@g.com",
                    status: "Online",
                    updatedAt: Date.now().toLocaleString()
                }, {
                    id: "6",
                    name: "Student 6",
                    email: "f@g.com",
                    status: "Online",
                    updatedAt: Date.now().toLocaleString()
                }, {
                    id: "7",
                    name: "Student 7",
                    email: "f@g.com",
                    status: "Online",
                    updatedAt: Date.now().toLocaleString()
                }, {
                    id: "8",
                    name: "Student 8",
                    email: "f@g.com",
                    status: "Online",
                    updatedAt: Date.now().toLocaleString()
                }, {
                    id: "9",
                    name: "Student 9",
                    email: "f@g.com",
                    status: "Online",
                    updatedAt: Date.now().toLocaleString()
                }, {
                    id: "10",
                    name: "Student 10",
                    email: "f@g.com",
                    status: "Online",
                    updatedAt: Date.now().toLocaleString()
                }]
            },
            teacher: {
                id: "3",
                name: "Teacher 3 Name",
                email: "g@h.com",
                updatedAt: Date.now().toLocaleString()
            },
            status: "Online"
        }
    }
}

export const roomStore = new BehaviorSubject(defaultStore); // create test file, run a few basic tests (getActive/setActive are good functions to start, can use fakeStore)

export default {
    getActive(): Observable<any> {
        return roomStore.asObservable().pipe(
            map(store => store.active && store.active in store.all ? store.all[store.active] : null) // purpose of fn is to return the active room from its ID
        )
    },
    setActive(id: string) {
        this.setState({
            active: id
        })
    },
    getAll(): any {
        return roomStore.asObservable().pipe(
            map(store => Object.values(store.all))
        )
    },
    setAll(objects: any[]) {
        let nextAll = {}
        for (let item of objects) {
            if (item.id) {
                nextAll[item.id] = item
            }
        }
        this.setState({
            all: nextAll
        })
    },
    getAllStudents(): any {
        return roomStore.asObservable().pipe(
            map(store => Object.values(store.allStudents))
        )
    },
    getStudent(id: string): Observable<any> { // feature-limited because it doesn't allow teachers to get a student/view history after a room is no longer in the store
        return roomStore.asObservable().pipe(
            map(store => store.allStudents[id] ? store.allStudents[id] : null)
        )
    }, 
    getActiveStudent(): Observable<any> {
        // if (!roomStore.getValue().activeStudent) {
        //     this.storage.create().then(() => {
        //         this.storage.get('id').then(
        //             (id) => {
        //                 if (id) {
        //                     this.setActiveStudent(id)
        //                 }
        //             }
        //         )
        //     })
        // }
        return roomStore.asObservable().pipe(
            map(({allStudents, activeStudent}) => 
                allStudents && activeStudent && allStudents[activeStudent] 
                    ? allStudents[activeStudent] 
                    : null
            )
        )
    },
    getActiveStudentHistory(): Observable<any> {
        return roomStore.asObservable().pipe(
            map(({allStudents, activeStudent}) => 
                allStudents && activeStudent && allStudents[activeStudent] 
                    ? allStudents[activeStudent].history
                    : null
            )
        )
    },
    setActiveStudent(id: string) {
        this.setState({
            
            activeStudent: id
        })
        console.log(roomStore)
        // this.storage.set('id', id)
    },
    setAllStudents(objects: any[]): any {
        let nextAll = {}
        for (let item of objects) {
            if (item.id) {
                nextAll[item.id] = item
            }
        }
        this.setState({
            allStudents: nextAll
        })
    },
    // create methods to set/get all students, allowing you to query students from roomstore
    getOne(id: string): Observable<any> {
        return roomStore.asObservable().pipe(
            map(store => store.all[id] ? store.all[id] : null)
        )
    },
    addOne(item: any) {
        if (item.id) {
            const currentState = roomStore.getValue()
            const nextAll = {
                ...currentState.all,
                [item.id]: item
            }

            this.setState({
                all: nextAll
            })

        } else {
            console.error("Item being added needs ID property")
        }
    },
    deleteOne(id: string) {
        const currentState = roomStore.getValue()
        if (id in currentState.all) {
            delete currentState.all[id]
            this.setState({all: currentState.all})
        }
    },
    addStudentToRoom(student: Partial<Student>) {
        console.log(student)
        const allRooms = roomStore.getValue()['all']
        const roomId = student?.roomStudentId
        let studentRoom: any = allRooms[roomId] // was Partial<Room>
        console.log(studentRoom)

        // write room to store
        const currentStudents = studentRoom.student.items
        const nextStudents: Student[] = [...currentStudents, student]
        studentRoom.student.items = nextStudents
        this.addOne(studentRoom)
        // this.getActive().pipe(last()).subscribe(
        //     (room: Room) => {
        //         console.log(room)
        //         this.addOne(
        //             {
        //                 ...room,
        //                 student: {
        //                     ...room.student,
        //                     items: [
        //                         ...room.student.items,
        //                         student
        //                     ]
        //                 }
        //             }
        //         )
        //     }
        // )
    },
    setState(partialState: any) {
        const currentState = roomStore.getValue()
        const nextState = {
            ...currentState,
            ...partialState
        }
        roomStore.next(nextState)
    }
}