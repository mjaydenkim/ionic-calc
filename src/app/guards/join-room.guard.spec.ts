import { TestBed } from '@angular/core/testing';

import { JoinRoomGuard } from './join-room.guard';

describe('JoinRoomGuard', () => {
  let guard: JoinRoomGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(JoinRoomGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
