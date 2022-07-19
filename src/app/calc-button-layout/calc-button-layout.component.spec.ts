import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { primaryButtons } from './calc-button-layout.component';

import { CalcButtonLayoutComponent } from './calc-button-layout.component';
import { CalcButtonComponent } from '../calc-button/calc-button.component';
import { DebugElement } from '@angular/core';
import { CalcFourFunctionComponent } from '../calc-four-function/calc-four-function.component';
import { CalcGraphingComponent } from '../calc-graphing/calc-graphing.component';

describe('CalcButtonLayoutComponent', () => {
  let component: CalcButtonLayoutComponent;
  let fourFunctionComponent: CalcFourFunctionComponent;
  let fixture: ComponentFixture<CalcButtonLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcButtonLayoutComponent, CalcButtonComponent, CalcFourFunctionComponent, CalcGraphingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalcButtonLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  function pressCalcKey (key: string) {
    let allKeys = fixture.debugElement.queryAll(By.css(".calc-button button"))
    let elementToClick: DebugElement
    for (let eachKey of allKeys) {
      if (eachKey.nativeElement.innerText.trim() === key) { // the change that made it work was the trim()
        elementToClick = eachKey
      }
    }
    if (elementToClick) {
      elementToClick.nativeElement.click()
    }
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should press certain key', () => {
    const clickSpy = spyOn(component, "handlePress")
    pressCalcKey("1")
    expect(clickSpy).toHaveBeenCalledWith("1")
  });

  it('should press all primary buttons ', () => {
    const clickSpy = spyOn(component, "handlePress")
    for (let button of primaryButtons) {
      pressCalcKey(button)
      expect(clickSpy).toHaveBeenCalledWith(button)
    }
  })

  it('should press all buttons ', fakeAsync(() => {
    const clickSpy = spyOn(component, "handlePress")
    let buttonSet: Set<string> = new Set()
    for (let buttonList of [...component.fourFunctionDefaultLayout, ...component.graphingDefaultLayout]) {
      buttonList.forEach((button) => {
        buttonSet.add(button)
      })
    }

    const buttonArray: string[] = Array.from(buttonSet)

    for (let button of buttonArray) {
      if (button != "←" && button != "ANS") { // should test these separately, since they have different functions
        pressCalcKey(button)
        tick()
        expect(clickSpy).toHaveBeenCalledWith(button)
      }
    }
    console.log(buttonSet)
  }))

  it('should communicate with calc-button-service', () => {
    const serviceSpy = spyOn(component.buttonService, "notify")
    pressCalcKey("2")
    expect(serviceSpy).toHaveBeenCalledWith("2")
  })
});
