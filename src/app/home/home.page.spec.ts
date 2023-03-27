import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Notify } from 'notiflix';

import { RoomService } from '../services/room.service';
import { StudentService } from '../services/student.service';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  // const joinRoomSpy = spyOn(component, "joinRoom")

  let getActiveStudentSpy = jasmine.createSpy().and.returnValue(
    Promise.resolve(null)
  )
  let setActiveStudentSpy = jasmine.createSpy()
  let updateStatusSpy = jasmine.createSpy()

  let mockStudentService: Partial<StudentService> = {
    getActiveStudent: getActiveStudentSpy,
    updateStatus: updateStatusSpy,
    setActiveStudent: setActiveStudentSpy,
  }
  
  let failureSpy = jasmine.createSpy()

  let mockNotiflixService: any = {
    failure: failureSpy
  }

  let getRoomByCodeSpy = jasmine.createSpy().and.returnValue(
    Promise.resolve({})
  )
  let setRoomCodeSpy = jasmine.createSpy()
  let getActiveRoomSpy = jasmine.createSpy().and.returnValue(
    new Observable(null)
  )
  let addStudentToRoomSpy = jasmine.createSpy().and.returnValue(
    Promise.resolve(null)
  )

  let mockRoomService: Partial<RoomService> = {
    getRoomByCode: getRoomByCodeSpy,
    getActiveRoom: getActiveRoomSpy,
    setRoomCode: setRoomCodeSpy,
    addStudentToRoom: addStudentToRoomSpy
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: RoomService,
          useValue: mockRoomService
        },
        {
          provide: StudentService,
          useValue: mockStudentService
        },
        {
          provide: Notify,
          useValue: mockNotiflixService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // afterEach(() => {
  //   flush()
  // })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it ('number of calc-buttons should match ts variable', () => {
  //   let numRows = (fixture.debugElement.queryAll(By.css(".calc-button"))).length

  //   let totalButtons = 0

  //   for (let i = 0; i < component.layout.length; i++) {
  //     totalButtons += component.layout[i].length
  //   }

  //   expect(numRows).toEqual(totalButtons)   
  // });
  it('should load getActiveStudent after loading page', () => {
    expect(getActiveStudentSpy).toHaveBeenCalled()
  })

  it('should change mode upon variable change', () => {
    expect(component.mode).toEqual("default")
    component.changeMode()
    expect(component.mode).toEqual("graphing")
  })

  it('should allow joining a proctor room', () => {
    const joinRoomButton = fixture.debugElement.query(By.css(".join-room"))

    joinRoomButton.nativeElement.click()
    expect(component.isJoining).toEqual(true)
    // expect(joinRoomSpy).toHaveBeenCalled()
  })

  it('should support calling newJoin()', () => {
    // unit test
    component.code = "VaME"
    component.isJoining = true
    component.newJoin()

    expect(setActiveStudentSpy).toHaveBeenCalled()
    expect(getRoomByCodeSpy).toHaveBeenCalled()
    // expect(setRoomCodeSpy).toHaveBeenCalled()
    // expect(component.isJoining).toBeFalsy()
  })

  it('should throw error if joining w/o room code', () => {
    // integration test

    const newJoinSpy = spyOn(component, "newJoin")

    const joinRoomButton = fixture.debugElement.query(By.css(".join-room"))

    joinRoomButton.nativeElement.click()
    fixture.detectChanges();

    const roomCodeForm = fixture.debugElement.query(By.css(".room-code"))
    const roomCodeInput = fixture.debugElement.query(By.css(".room-code-input"))
    const roomCodeButton = fixture.debugElement.query(By.css(".room-code-button"))

    // roomCodeButton.nativeElement.click()
    // roomCodeButton.nativeElement.dispatchEvent(new Event('input'));
    // fixture.detectChanges()

    roomCodeForm.triggerEventHandler('submit', null)
    fixture.detectChanges()

    expect(setActiveStudentSpy).not.toHaveBeenCalled()

    expect(roomCodeInput.nativeElement).toBeDefined()
    expect(roomCodeButton.nativeElement).toBeDefined()
    expect(roomCodeButton.nativeElement.innerHTML).toEqual("Next")

    expect(newJoinSpy).toHaveBeenCalled()

    expect(component.code).toEqual("")

    expect(failureSpy).toHaveBeenCalled()

    // expect(component.code).toEqual("")

    // roomCodeInput.nativeElement.value = "VaME"

    // expect(roomCodeInput.nativeElement.value).toEqual("VaME")

    // roomCodeInput.nativeElement.dispatchEvent(new Event('input', {bubbles: true}));
    // fixture.detectChanges();

    // expect(component.code).toBeDefined()

    // roomCodeButton.nativeElement.click()

    // expect(newJoinSpy).toHaveBeenCalled()
  })
});
