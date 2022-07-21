import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import functionPlot from 'function-plot'

import process from '../utilities/process';
import catchMathJaxError from '../utilities/catchMathJaxError';

import { CalcButtonService } from '../services/calc-button.service';
import { CalcToasterNotificationService } from '../services/calc-toaster-notification.service';
import { FunctionPlotDatum } from 'function-plot/dist/types';

@Component({
  selector: 'app-calc-graphing',
  templateUrl: './calc-graphing.component.html',
  styleUrls: ['./calc-graphing.component.scss'],
})

export class CalcGraphingComponent implements AfterViewInit, OnDestroy {

  mode: string = "graphing" // constant

  buttonSubscription: Subscription
  domainRight: number = 3
  domainLeft: number = -3
  errorCaught: boolean = false
  keyboardMode: number = 0

  @ViewChild("div1", { static: true }) div1;

  expression = "x";
  display = "$x$";

  constructor(public buttonService: CalcButtonService, public toasterNotificationService: CalcToasterNotificationService) {
    this.buttonSubscription = buttonService.listen().subscribe((event) => {this.handlePress(event)})
    this.toasterNotificationService = toasterNotificationService
  }

  ngAfterViewInit() {
    const group = [];
    group.push(this.createGraph(this.div1.nativeElement));
  }

  ngOnDestroy() {
    this.buttonSubscription.unsubscribe()
  }

  createGraph(element) {

    var graph = element;
    var width = 100;
    var x1 = this.domainLeft; // domain left
    var x2 = this.domainRight; // domain right
    var xs = 1.0 * (x2 - x1) / width;
    var data: FunctionPlotDatum = {
      fn: process(this.expression),
    }
    
    if (!this.expression.includes("ln(")) {
      data.graphType = 'polyline'
    } // ln untraceable ????

    return functionPlot({
      width: 300,
      height: 200,
      target: '#root',
      data: [data],
    });
  }

  handlePress(event) {
    if (this.errorCaught) {
      this.expression = ""
      this.errorCaught = false
    }
    if (this.keyboardMode == 1 && event != "2nd") {
      this.keyboardMode = 0
    }
    if (event == "default") {}
    else if (event == "2nd") {
      this.keyboardMode = 1
    }
    else if (event == "CE") {
      this.expression = ""
    }
    else if (event == "←") {
      this.expression = this.expression.slice(0, -1)
    }
    else if (event == "=") {
      const group = [];
      try {
        group.push(this.createGraph(this.div1.nativeElement));
      } catch (e) {
        console.log(e.message)
        try {
          if (catchMathJaxError(this.expression, e) != null) {
            this.expression = catchMathJaxError(this.expression, e)
            group.push(this.createGraph(this.div1.nativeElement));
          }
        } catch (e) {
          this.dangerToast(e)
        }
      }
    }
    else {
      this.expression += event // TODO: handle rounding for large numbers
    }
    this.display = "$" + this.expression + "$"
  }

  handleRight() {
    this.domainRight += 1
    // this.domainLeft += 1
    this.createGraph(this.div1.nativeElement)
  }
  
  handleLeft() {
    this.domainLeft -= 1
    // this.domainRight -= 1
    this.createGraph(this.div1.nativeElement)
  }

  dangerToast(message: string) {
    this.toasterNotificationService.showError(message, "Error")
  }

}