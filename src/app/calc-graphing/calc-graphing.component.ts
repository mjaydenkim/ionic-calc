import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import functionPlot, { Chart } from 'function-plot'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import process from '../utilities/process';
import catchMathJaxError from '../utilities/catchMathJaxError';

Notify.init({
  "clickToClose": true
})

@Component({
  selector: 'app-calc-graphing',
  templateUrl: './calc-graphing.component.html',
  styleUrls: ['./calc-graphing.component.scss'],
})

export class CalcGraphingComponent implements AfterViewInit, OnDestroy {

  mode: string = "graphing" // constant

  buttonSubscription: Subscription
  domainRight: number = 10
  domainLeft: number = -10
  errorCaught: boolean = false
  keyboardMode: number = 0

  @ViewChild("div1", { static: true }) div1;

  expression = "x";
  defaultDisplay = "x";
  data = []

  constructor() { }

  ngAfterViewInit() {
    const group = [];
    group.push(this.createGraph(this.div1.nativeElement, [this.defaultDisplay]));
  }

  ngOnDestroy() {
    this.buttonSubscription?.unsubscribe()
  }

  createGraph(element: Element, fn: string[]): Chart {
    return functionPlot({
      width: 300,
      height: 200,
      xAxis: { domain: [this.domainLeft, this.domainRight] },
      grid: true,
      data: fn.map((f) => ({
        fn: process(f),
        graphType: 'polyline'
      })),
       target: '#root',
    });
  }

  handleGraphing(event: string[]) {
    console.log(event)
    const group = [];
    try {
      group.push(this.createGraph(this.div1.nativeElement, event));
      // todo: dynamic domain inference
      this.domainRight = 10
      this.domainLeft = -10
    } catch (e) {
      console.log(e.message);
      try { // autocorrects missing parentheses error (and other errors if they're coded into catchmathjaxerror, but none are right now)
        // if (catchMathJaxError(event, e) != null) {
          // event = catchMathJaxError(exp, e)
        group.push(this.createGraph(this.div1.nativeElement, event));
        // }
      } catch (e) {
        if (("" + e).includes("no statements saved")) {
          Notify.failure("Empty expression detected")
        } else {
          Notify.failure("" + e);
        }
      }
    }
  }

  handleKeyboardModeChange(event: number) {
    this.keyboardMode = event;
  }
}