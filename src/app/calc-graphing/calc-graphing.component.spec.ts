import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ToastrModule } from 'ngx-toastr';

import { CalcGraphingComponent } from './calc-graphing.component';

describe('CalcGraphingComponent', () => {
  let component: CalcGraphingComponent;
  let fixture: ComponentFixture<CalcGraphingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcGraphingComponent ],
      imports: [IonicModule.forRoot(), ToastrModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalcGraphingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
