import { API, graphqlOperation } from 'aws-amplify'
import { listRooms } from 'src/graphql/queries'

export default {
    load(): Promise<any> {
        const result: any = API.graphql(graphqlOperation(listRooms)).then(() => {
            // this.setState()
        })
        return result
    }
}