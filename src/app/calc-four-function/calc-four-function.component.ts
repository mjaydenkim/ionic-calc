import { Component, OnInit, ViewChild, ElementRef, OnDestroy, EventEmitter, Output } from '@angular/core';
import { CalcButtonService } from '../services/calc-button.service';
import { Subscription } from 'rxjs'
import process from '../utilities/process';
import { create, all } from 'mathjs';

import { primaryButtons } from '../calc-button-layout/calc-button-layout.component'; 
import { Notify } from 'notiflix';
import { HistoryEvent } from '../home/home.page';

Notify.init({
  "clickToClose": true
})

const math = create(all)

math.import({
  ln: math.log,
  nCr: function(n, r) {
    try {
      return math.combinations(n,r)
    } catch (e) {
      Notify.failure("Format of permutations should be nPr(n,r)");
    }
  },
  nPr: function(n, r) {
    try {
      return math.permutations(n,r)
    } catch (e) {
      Notify.failure("Format of permutations should be nPr(n,r)");
    }
  },
  DToR: function(n) {
    return (n % 360) * (Math.PI / 180);
  },
  RToD: function(n) {
    return n * (180/Math.PI);
  },
})

@Component({
  selector: 'app-calc-four-function',
  templateUrl: './calc-four-function.component.html',
  styleUrls: ['./calc-four-function.component.scss'],
})

export class CalcFourFunctionComponent implements OnInit, OnDestroy {

  @Output() appendHistory: EventEmitter<HistoryEvent> = new EventEmitter<HistoryEvent>();

  mode: string = "default" // constant

  buttonSubscription: Subscription
  display: string = ""
  answer: string = ""
  operators: string[] = [
    "^", "/", "*", "-", "=", "+"
  ]
  keyboardMode: number = 0
  CEPressed: boolean = false

  history: string[][] = [] // use append or spread operator to add element to history

  finished = false;

  @ViewChild("expression") public expression: ElementRef<any>

  ngAfterViewChecked(): void {
    this.expression.nativeElement.scrollLeft += 1000;
    this.expression.nativeElement.scrollTop += 1000;
  }

  constructor(public buttonService: CalcButtonService) { // where the service is declared. don't forget public -- allows the rest of the component to access the service
    this.buttonSubscription = buttonService.listen().subscribe(({key}) => {this.handlePress(key)})
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
        if (this.operators.includes(event)) {
          this.display = this.answer
        }
        else {
          this.display = ""
        }
        this.answer = ""
    }
    this.finished = false;

    if (event != "CE") this.CEPressed == false;

    if (this.keyboardMode == 1 && event != "2nd" && !primaryButtons.includes(event)) {
      this.keyboardMode = 0
    }
    if (event == "default") {}
    else if (event == "2nd") {
      this.keyboardMode = 1
    } else if (event == "ANS") {
      this.display += this.history[this.history.length - 1][1] // is this how i want to do it? process.js?
    } else if (event == "CE") {
      if (this.CEPressed == true) { // TODO: if was previously cleared!
        this.history = [[]]
        this.CEPressed = false;
      } else {
        this.CEPressed = true;
      }
      this.display = ""
      this.answer = ""
    } else if (event == "←") {
      this.display = this.display.slice(0, -1)
    } else if (event == "frac") {
      let fraction = math.fraction(this.history[this.history.length - 1][1])
      this.display = "frac(" + this.history[this.history.length - 1][1] + ")"
      this.answer = fraction.n + "/" + fraction.d
      this.finished = true;
      this.appendHistory.emit({equation: this.display, answer: this.answer})
    } else if (event == "dec") {
      let fraction = math.fraction(this.history[this.history.length - 1][1])
      this.display = "dec(" + this.history[this.history.length - 1][1] + ")"
      this.answer = fraction.n + "/" + fraction.d
      this.finished = true;
      this.appendHistory.emit({equation: this.display, answer: this.answer})
    } else if (event == "=") {
        try {
          this.answer = String(math.format(math.evaluate(process(this.display)), {precision: 13}))
          this.finished = true
          this.appendHistory.emit({equation: this.display, answer: this.answer})
        } catch (err) {
          Notify.failure("" + err);
        }
    } else {
      this.display += event // TODO: handle rounding for large numbers
    }
  }

  evaluatePermComb(display: string) {
    if (display.includes("nPr")) {
      const [first, second] = display.split("nPr")
      return math.permutations(
        Number(math.format(math.evaluate(process(first)), {precision: 14})),
        Number(math.format(math.evaluate(process(second)), {precision: 14}))
      )
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
