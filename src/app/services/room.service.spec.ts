import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';

import { RoomService } from './room.service';

describe('RoomService', () => {
  let service: RoomService;

  let setStorageSpy = jasmine.createSpy()
  let getStorageSpy = jasmine.createSpy()
  let createStorageSpy = jasmine.createSpy().and.returnValue(
    Promise.resolve(null)
  )

  let mockStorage: Partial<Storage> = {
    set: setStorageSpy,
    get: getStorageSpy,
    create: createStorageSpy
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Storage,
          useValue: mockStorage
        }
      ]
    });
    service = TestBed.inject(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should activate storage instance', () => {
    expect(createStorageSpy).toHaveBeenCalled()
  })
});