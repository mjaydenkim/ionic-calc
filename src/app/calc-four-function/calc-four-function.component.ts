import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CalcButtonService } from '../services/calc-button.service';
import { Subscription } from 'rxjs'
import process from '../utilities/process';
import * as math from 'mathjs';

import { primaryButtons } from '../calc-button-layout/calc-button-layout.component'; 

@Component({
  selector: 'app-calc-four-function',
  templateUrl: './calc-four-function.component.html',
  styleUrls: ['./calc-four-function.component.scss'],
})
export class CalcFourFunctionComponent implements OnInit, OnDestroy {

  mode: string = "default" // constant

  buttonSubscription: Subscription
  display: string = ""
  answer: string = ""
  operators: string[] = [
    "^", "/", "*", "-", "=", "+"
  ]
  keyboardMode: number = 0

  history: string[][] = [] // use append or spread operator to add element to history

  finished = false;

  @ViewChild("expression") public expression: ElementRef<any>

  ngAfterViewChecked(): void {
    this.expression.nativeElement.scrollLeft += 1000;
    this.expression.nativeElement.scrollTop += 1000;
  }

  constructor(public buttonService: CalcButtonService) { // where the service is declared. don't forget public -- allows the rest of the component to access the service
    this.buttonSubscription = buttonService.listen().subscribe((event) => {this.handlePress(event)})
  }

  ngOnInit() {
    console.log("initialized")
    this.history = this.buttonService.getLastHistory()
    if (this.history.length != 0) {
      this.display = this.history[this.history.length - 1][0]
      this.answer = this.history[this.history.length - 1][1]
      this.history = this.history.slice(0, -1)
      this.finished = true
    }
  }

  ngOnDestroy() {
    this.history = [...this.history, [this.display, this.answer]]
    this.buttonService.setLastHistory(this.history)
    this.buttonSubscription.unsubscribe()
  }

  handlePress(event) {
    if (this.finished) {
      this.history = [...this.history, [this.display, this.answer]]
        // for (let i = 0; i < this.history.length; i++) {
        //   this.display += (this.history[i].toString()) + "\n";
        //   console.log(this.display)
        // }
        if (this.operators.includes(event)) {
          this.display = this.answer
        }
        else {
          this.display = ""
        }
        this.answer = ""
    }
    this.finished = false;

    if (this.keyboardMode == 1 && event != "2nd" && !primaryButtons.includes(event)) {
      this.keyboardMode = 0
    }
    if (event == "default") {}
    else if (event == "2nd") {
      this.keyboardMode = 1
    } else if (event == "ANS") {
      this.display += this.history[this.history.length - 1][1] // is this how i want to do it? process.js?
    } else if (event == "CE") {
      this.display = ""
      this.answer = ""
    } else if (event == "←") {
      this.display = this.display.slice(0, -1)
    } else if (event == "√") {
      this.display = Math.sqrt(parseInt(this.display)).toString()
    } else if (event == "=") {
      this.answer = String(math.format(math.evaluate(process(this.display)), {precision: 14}))
      this.finished = true
    } else {
      this.display += event // TODO: handle rounding for large numbers
    }
  }
}
