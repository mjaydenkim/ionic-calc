import storeMethods, { roomStore, fakeStore } from './store'

describe('AppComponent', () => {
  beforeEach(
    () => {
      storeMethods.setState(fakeStore)
    }
  )
// can add for initializing store, setting store once blank, etc. make tests as granular as possible to find specific problem areas
  it('should getActive', () => {
    storeMethods.getActive().subscribe((active) => {
        expect(active.id).toEqual(fakeStore.active)
    }).unsubscribe()
  });
  it('should only return active items in store', () => {
    storeMethods.setActive('2048')
    storeMethods.getActive().subscribe((active) => {
      expect(active).toEqual(null)
  }).unsubscribe()
  })
  it('should getAll', () => {
    storeMethods.getAll().subscribe((all) => {
      console.log(all)
      expect(all).toEqual([{id: '1024', students: [], teacher: 'Teacher Name'}])
    }).unsubscribe()
  })
  it('should getOne', () => {
    storeMethods.getOne("1024").subscribe((one) => {
      expect(one).toEqual(
        {id: '1024', students: [], teacher: 'Teacher Name'}
      )
    }).unsubscribe()
  })
  it('should addOne', () => {
    storeMethods.addOne({id: '4096', students: [], teacher: 'Teacher Name'})
    storeMethods.getOne("4096").subscribe((one) => {
      expect(one.id).toEqual('4096')
  }).unsubscribe()
  })
  it('should deleteOne', () => {
    storeMethods.deleteOne("4096")
    storeMethods.getOne("4096").subscribe((one) => {
      expect(one).toEqual(null)
    }).unsubscribe()
  })
  it('should be able to set a new item as active', () => {
    storeMethods.addOne({id: '4096', students: [], teacher: 'Teacher Name'})
    storeMethods.setActive('4096')
    storeMethods.getActive().subscribe((active) => {
      expect(active.id).toEqual("4096")
  }).unsubscribe()
  })
});