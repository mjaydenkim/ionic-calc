import { API, graphqlOperation, Auth } from 'aws-amplify'
import { nanoid } from 'nanoid'
import { createRoom } from 'src/graphql/mutations'
import { listRooms } from 'src/graphql/queries'
import { ListRoomsQuery, CreateRoomMutation, CreateRoomInput } from '../../API'
import roomStore from './store'
import { v4 as uuid } from 'uuid'

type Rooms = ListRoomsQuery['listRooms']['items']
type Room = CreateRoomMutation['createRoom']

var aws = require('aws-sdk')
var ddb = new aws.DynamoDB()

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
                // students: [],
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
};