import storeMethods, { roomStore } from './store'

describe('AppComponent', () => {
// can add for initializing store, setting store once blank, etc. make tests as granular as possible to find specific problem areas
  it('should setActive', () => {
    storeMethods.getActive().subscribe(() => {
        // expect()
    })
  });

});