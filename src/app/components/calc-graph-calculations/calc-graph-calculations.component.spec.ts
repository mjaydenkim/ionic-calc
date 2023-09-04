import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalcGraphCalculationsComponent } from './calc-graph-calculations.component';

describe('CalcGraphCalculationsComponent', () => {
  let component: CalcGraphCalculationsComponent;
  let fixture: ComponentFixture<CalcGraphCalculationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcGraphCalculationsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalcGraphCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
