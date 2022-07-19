import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

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

  it('', () => {

  })
});
