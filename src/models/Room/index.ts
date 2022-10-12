import { API, graphqlOperation, Auth } from 'aws-amplify'
import { nanoid } from 'nanoid'
import { createRoom } from 'src/graphql/mutations'
import { listRooms } from 'src/graphql/queries'
import { ListRoomsQuery, CreateRoomMutation, CreateRoomInput } from '../../API'
import roomStore from './store'
import { v4 as uuid } from 'uuid'

type Rooms = ListRoomsQuery['listRooms']['items']
type Room = CreateRoomMutation['createRoom']

export default {
    async load(): Promise<Rooms> {
        try {
            const result: any = await API.graphql(graphqlOperation(listRooms))
            if (result && result.listRooms && result.listRooms.items) {
                roomStore.setAll(result.listRooms.items)
                return result.listRooms.items
            }
            return []
        } catch (e) {
            console.error(e)
        }
    },

    async create(name: string) {
        console.log(Auth.currentAuthenticatedUser())
        // try {
        //     const results: any = this.postNewRoom({
        //         name,
        //         id: uuid(),
        //         code: nanoid(4),
        //         roomTeacherId: "lol"
        //     })
            
        //     // await API.graphql(graphqlOperation(createRoom, {
        //     //     input: {
        //     //         name,
        //     //         id: uuid(),
        //     //         code: nanoid(4)
        //     //     }
        //     // }))
        //     if (results && results.createRoom) {
        //         roomStore.addOne(results.createRoom)
        //         return results.createRoom
        //     }
        // } catch (e) {
        //     console.error(e)
        // }
    },

    // async postNewRoom(input: CreateRoomInput): Promise<{data: CreateRoomMutation}> {
    async postNewRoom(input: CreateRoomInput) {
        return API.graphql(graphqlOperation(
          createRoom, { input: input }
        ));
      },

}