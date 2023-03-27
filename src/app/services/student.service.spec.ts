import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';

import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;

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
          useValue: mockStorage // can be a variable hooked up with a spy
        }
      ]
    });
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should activate storage instance', () => {
    expect(createStorageSpy).toHaveBeenCalled()
  })
});
