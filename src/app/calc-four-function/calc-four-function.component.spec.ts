import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { ToastrModule } from 'ngx-toastr';
import { CalcButtonLayoutComponent } from '../calc-button-layout/calc-button-layout.component';
import { CalcButtonComponent } from '../calc-button/calc-button.component';
import { CalcToasterNotificationService } from '../services/calc-toaster-notification.service';

import { CalcFourFunctionComponent } from './calc-four-function.component';

describe('CalcFourFunctionComponent', () => {
  let component: CalcFourFunctionComponent;
  let fixture: ComponentFixture<CalcFourFunctionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcFourFunctionComponent, CalcButtonComponent, CalcButtonLayoutComponent ],
      imports: [IonicModule.forRoot(), ToastrModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalcFourFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it ('should call handlePress when key is pressed', () => {
    const clickSpy = spyOn(component, "handlePress")
    component.display = "12345"
    
    component.buttonService.notify("6")

    expect(clickSpy).toHaveBeenCalledWith("6")
  })

  it ('should add to display when a number key is pressed', () => {
    component.display = "12345"
    
    component.buttonService.notify("6")

    expect(component.display).toEqual("123456")
  })

  it ('should delete from display when the backspace key is pressed', () => {
    component.display = "12345"
    
    component.buttonService.notify("←")

    expect(component.display).toEqual("1234")
  })
    
  it ('should clear display when the clear key is pressed', () => {
    component.display = "12345"
    
    component.buttonService.notify("CE")

    expect(component.display).toEqual("")
  })

  it ('should add two numbers together', () => {
    component.display = "1"
    
    component.buttonService.notify("+")
    component.buttonService.notify("1")
    component.buttonService.notify("=")

    expect(component.answer).toEqual("2")
  })

  it ('rounds two floats properly', () => {
    component.display = "0.1"

    component.buttonService.notify("+")

    component.buttonService.notify("0")
    component.buttonService.notify(".")
    component.buttonService.notify("2")

    component.buttonService.notify("=")

    expect(component.answer).toEqual("0.3")
  })

  it ('calculates large numbers in scientific notation', () => {
    component.display = "1000000000000000"

    component.buttonService.notify("/")

    component.buttonService.notify("2")
    
    component.buttonService.notify("=")

    expect(component.answer).toEqual("5e+14")
  })

  it ('multiplies with floating points correctly', () => {
    component.display = "23"

    component.buttonService.notify("*")

    component.buttonService.notify("1")
    component.buttonService.notify(".")
    component.buttonService.notify("4")
    component.buttonService.notify("0")

    component.buttonService.notify("=")

    expect(component.answer).toEqual("32.2")
  })

  it ('should handle divison by zero', () => {
    component.display = "5"

    component.buttonService.notify("/")
    component.buttonService.notify("0")
    component.buttonService.notify("=")

    expect(component.answer).toEqual("Infinity")
  })

  it ('should handle exponent of 0.5', () => {
    component.display = "0.16"

    component.buttonService.notify("^")

    component.buttonService.notify("0")
    component.buttonService.notify(".")
    component.buttonService.notify("5")

    component.buttonService.notify("=")

    expect(component.answer).toEqual("0.4")
  })

  it ('should multiply two large numbers', () => {
    component.display = "15000000000000000"

    component.buttonService.notify("*")
    component.buttonService.notify("5")
    component.buttonService.notify("=")

    expect(component.answer).toEqual("7.5e+16")
  })

  it ('should subtract two floating-point numbers', () => {
    component.display = "2.56"

    component.buttonService.notify("-")

    component.buttonService.notify("0")
    component.buttonService.notify(".")
    component.buttonService.notify("4")
    component.buttonService.notify("6")

    component.buttonService.notify("=")

    expect(component.answer).toEqual("2.1")
  })

  it('should press 2nd key to change buttons', () => {
    component.buttonService.notify("2nd")
    expect(component.keyboardMode).toEqual(1)
  })

  it('should reset after shifted key pressed', () => {
    component.buttonService.notify("2nd")
    expect(component.keyboardMode).toEqual(1)
    component.buttonService.notify("asin(")
    expect(component.keyboardMode).toEqual(0)
  })

  it('should reset after default key pressed', () => {
    component.buttonService.notify("2nd")
    expect(component.keyboardMode).toEqual(1)
    component.buttonService.notify("default")
    expect(component.keyboardMode).toEqual(0)
  })

  it('should not reset after primary key pressed', () => {
    component.buttonService.notify("2nd")
    expect(component.keyboardMode).toEqual(1)
    component.buttonService.notify("8")
    expect(component.keyboardMode).toEqual(1)
  })
});
