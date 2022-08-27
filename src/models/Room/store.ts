import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

const defaultStore = {
    active: null,
    all: {} // all is a key-value pair of room ID -- room properties. should be able to look up a room by its ID, get students as property
}

const fakeStore = {
    active: "1024",
    all: {
        1024: {
            id: "1024",
            students: [],
            teacher: "Teacher Name"
        }
    }
}

const roomStore = new BehaviorSubject(defaultStore);

export default {
    getActive(): Observable<any> {
        return roomStore.asObservable().pipe(
            map(store => store.active ? store.all[store.active] : null) // purpose of fn is to return the active room from its ID
        )
    },
    setActive(id: string) {
        this.setState({
            active: id
        })
    },
    getAll() {
        const objectToArray = (allItemsObject: any) => {
            const ids = Object.keys(allItemsObject)
            return ids.map((id) => allItemsObject[id])
        }
        return roomStore.asObservable().pipe(
            map(store => objectToArray(store.all))
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
    getOne(id: string) {
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
    setState(partialState: any) {
        const currentState = roomStore.getValue()
        const nextState = {
            ...currentState,
            ...partialState
        }
        roomStore.next(nextState)
    }
}