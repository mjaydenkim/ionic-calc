import { API, graphqlOperation, Auth } from 'aws-amplify'
import { nanoid } from 'nanoid'
import { createRoom } from 'src/graphql/mutations'
import { listRooms } from 'src/graphql/queries'
import { ListRoomsQuery, CreateRoomMutation, CreateRoomInput, OnUpdateRoomSubscription } from '../../API'
import roomStore from './store'
import { v4 as uuid } from 'uuid'
import { Observable, Subscription } from 'rxjs'
import { onCreateStudent, onUpdateRoom, onUpdateStudent } from 'src/graphql/subscriptions'

type Rooms = ListRoomsQuery['listRooms']['items']
type Room = CreateRoomMutation['createRoom']

let roomChanges: Subscription = null
let studentChanges: Subscription = null

export default {
    async load(): Promise<Rooms> {
        try {
            const result: any = await API.graphql(graphqlOperation(listRooms))
            if (result && result.data && result.data.listRooms && result.data.listRooms.items) {
                roomStore.setAll(result.data.listRooms.items)
                console.log(result.data.listRooms.items)
                return result.data.listRooms.items
            }
            console.log(result)
            return []
        } catch (e) {
            console.error(e)
        }
    },

    async create(name: string) {
        const user = await Auth.currentAuthenticatedUser()
        console.log(user.attributes.sub)
        try {
            const results: any = this.postNewRoom({
                name: name,
                id: uuid(),
                code: nanoid(4),
                students: [],
                roomTeacherId: user.attributes.sub
            })
            
            // await API.graphql(graphqlOperation(createRoom, {
            //     input: {
            //         name,
            //         id: uuid(),
            //         code: nanoid(4)
            //     }
            // }))
            if (results && results.createRoom) {
                roomStore.addOne(results.createRoom)
                return results.createRoom
            }
        } catch (e) {
            console.error(e)
        }
    },

    // async postNewRoom(input: CreateRoomInput): Promise<{data: CreateRoomMutation}> {
    async postNewRoom(input: CreateRoomInput) {
        return API.graphql(graphqlOperation(
            createRoom, { input: input }
        ));
    },
    
    initRoomSubscription(roomId: string): Subscription {
        console.log("initializing subscription to room: " + roomId)
        const roomObservable: any = API.graphql(graphqlOperation(onCreateStudent, {
            filter: {
                roomTeacherId: { eq: roomId }
            }
        }))
        if (!roomChanges) {
            roomChanges = roomObservable.subscribe({
                next: (response) => {console.log(response)}, // update room info in store
                error: (e) => {console.log(e)}
            })
        }
        return roomChanges
    },

    unsubscribeRoom() {
        roomChanges?.unsubscribe()
    }, 

    initStudentSubscription(roomId: string) {
        console.log("initializing subscription to student: " + roomId)
        const studentObservable: any = API.graphql(graphqlOperation(onUpdateStudent, {
            filter: {
                roomStudentId: { eq: roomId }
            }
        }))
        if (!studentChanges) {
            studentChanges = studentObservable.subscribe({
                next: (response) => {console.log(response)}, // update student info in room store
                error: (e) => {console.log(e)}
            })
        }
    },

    unsubscribeStudent() {
        studentChanges?.unsubscribe()
    }
};