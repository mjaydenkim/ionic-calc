import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CalcButtonService } from '../services/calc-button.service';
import { Subscription } from 'rxjs'
import process from '../utilities/process';
import { create, all } from 'mathjs';

import { primaryButtons } from '../calc-button-layout/calc-button-layout.component'; 
import { CalcToasterNotificationService } from '../services/calc-toaster-notification.service';

const math = create(all)

math.import({
  ln: math.log,
  // log10: function (value: number) {
  //   return math.log(value, 10)
  // }
  nPr: math.permutations,
  nCr: math.combinations
})

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

  constructor(public buttonService: CalcButtonService, public toasterNotificationService: CalcToasterNotificationService) { // where the service is declared. don't forget public -- allows the rest of the component to access the service
    this.buttonSubscription = buttonService.listen().subscribe((event) => {this.handlePress(event)})
    this.toasterNotificationService = toasterNotificationService
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
    } else if (event == "frac") {
      let fraction = math.fraction(this.history[this.history.length - 1][1])
      this.answer = fraction.n + "/" + fraction.d
    }
    // else if (event == "√") {
    //   this.display = Math.sqrt(parseInt(this.display)).toString()
    // } 
    else if (event == "=") {
      // if (this.display.includes("nPr") || this.display.includes("nCr")) {
      //   this.answer = String(this.evaluatePermComb(this.display))
      //   this.finished = true // add pseudo-evaluation for permutations, combinations
      // } else {
        try {
          this.answer = String(math.format(math.evaluate(process(this.display)), {precision: 13}))
          this.finished = true
        } catch (e) {
          this.dangerToast(e)
        }
      // }
    } else {
      this.display += event // TODO: handle rounding for large numbers
    }
  }

  dangerToast(message: string) {
    this.toasterNotificationService.showError(message, "Error")
  }

  evaluatePermComb(display: string) {
    if (display.includes("nPr")) {
      const [first, second] = display.split("nPr")
      return math.permutations(
        Number(math.format(math.evaluate(process(first)), {precision: 14})),
        Number(math.format(math.evaluate(process(second)), {precision: 14}))
      )
      // return String()
    } else if (display.includes("nCr")) {
      const [first, second] = display.split("nCr")
      return math.combinations(
        Number(math.format(math.evaluate(process(first)), {precision: 14})),
        Number(math.format(math.evaluate(process(second)), {precision: 14}))
      )
    } else {

    }
  }

}
