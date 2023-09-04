import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import nerdamer from "nerdamer/all.js";

import { create, all } from 'mathjs';
import { BehaviorSubject, Subscription, delay } from 'rxjs';
import { CalcButtonService } from 'src/app/services/calc-button.service';
const math = create(all)

@Component({
  selector: 'calc-graph-calculations',
  templateUrl: './calc-graph-calculations.component.html',
  styleUrls: ['./calc-graph-calculations.component.scss'],
})
export class CalcGraphCalculationsComponent implements OnInit, OnDestroy {

  @Input() graphChanged: BehaviorSubject<any>;
  @Input() equations: string[] = [];
  @Input() activeExpression: number = 0 // TODO: make this work! right now it's staying at 0

  buttonSubscription: Subscription

  x: number = 0

  value: number | null
  zeroes: number[] | null
  minimum: number | null
  maximum: number | null
  derivative: number | null
  integral: number | null
  intersects: string[] | null // TODO: make sure this doesn't print twice or do anything else weird

  answer: string[] | number | number[] | null

  type: string = "value"

  inputValue: string[] = ["", ""] // index 0 is lower integral bound, index 1 is upper integral bound
  activeInputIndex: number = 1

  // integral-only vars
  isIntegral: boolean = false
  startingBound: number = 0

  constructor(private buttonService: CalcButtonService) {
    this.buttonSubscription = buttonService.listen().subscribe(({lastFocusedId, key}) => {
      // update input value based on this
      if (lastFocusedId == "lowerInput") {
        // handleLowerInput type function
        this.activeInputIndex = 0
        this.handleIntegral({target:{value:key}})
      } else if (lastFocusedId == "input") {
        // handleInput type function
        this.activeInputIndex = 1
        this.handlePress({target:{value:key}})
      }
    })
  }

  ngOnInit() {
    this.graphChanged.subscribe(async v => { 
      // this.equations = v.equations
      // this.activeExpression = v.activeExpression
      this.x = v.x 

      if (this.x) {
        await this.setValues()
        this.getCalculation(this.x)
      }
    });
  }

  ngOnDestroy() {
    this.buttonSubscription.unsubscribe()
  }

  setValues() {
    console.log(this.equations)
    console.log(this.activeExpression)
    this.value = math.round(math.evaluate(this.equations[this.activeExpression], {x: this.x}), 3) // TODO: fix the error in the console
    this.minimum = math.round(parseInt(this.calcMinMax(this.equations[this.activeExpression])[0]), 3)
    this.maximum = math.round(parseInt(this.calcMinMax(this.equations[this.activeExpression])[1]), 3)
    this.derivative = math.round(math.derivative(this.equations[this.activeExpression], 'x').evaluate({x: this.x}), 3)
    this.integral = math.round((nerdamer.defint(this.equations[this.activeExpression], this.startingBound, this.x, 'x').text('decimals')), 3)
    this.zeroes = nerdamer.solve(this.equations[this.activeExpression], 'x').toString().slice(1,-1).split(",").map((zero) => {
      if (isNaN(nerdamer(zero).text('decimals'))) {
        return null;
      } else {
        return math.round(nerdamer(zero).text('decimals'), 3)
      }
    })

    console.log(nerdamer.solve(this.equations[0] + " - " + this.equations[1] + " = 0", 'x').toString().slice(1,-1))

    this.intersects = nerdamer.solve(this.equations[0] + " - " + this.equations[1] + " = 0", 'x').toString().slice(1,-1).split(",").map((intersect) => { // debug 2+ intersects
      if (isNaN(nerdamer(intersect).text('decimals'))) {
        return null;
      } else {
        return math.round(nerdamer(intersect).text('decimals'), 3)
      }
    })

    this.answer = this[this.type]
  }

  calcMinMax(exp: string) {
    let extrema: string[] = [null, null]

    let firstDerivative = nerdamer.diff(exp, 'x')
    let secondDerivative = nerdamer.diff(exp, 'x', 2)
    let noSignExtrema = nerdamer.solve(firstDerivative.toString() + " = 0", 'x')
    for (let value in JSON.parse(noSignExtrema.toString())) {
      let sign = math.evaluate(secondDerivative.toString(), {x:value})
      if (sign.toString() > 0) {
        extrema[0] = value.toString() // this is a local minimum value
      } else if (sign.toString() < 0) {
        extrema[1] = value.toString() // this is a local maximum value
      }
    }
    return extrema
  }

  getCalculation(event: any) {
    if (event?.target?.value != undefined) {
      if (event.target.value == "value" || 
      event.target.value == "minimum" || 
      event.target.value == "maximum" || 
      event.target.value == "derivative" || 
      event.target.value == "integral" || 
      event.target.value == "zeroes" || 
      event.target.value == "intersects") {
        this.type = event.target.value
        this.answer = this[event.target.value]
        // console.log(this.answer)

        if (event.target.value == "integral") {
          this.isIntegral = true
        } else {
          this.isIntegral = false
        }
      }
    }
  }

  handleIntegral(event: any) {
    if (event?.target?.value != undefined && !isNaN(event.target.value)) {
      this.startingBound = event.target.value
      this.setValues()
    }
  }

  inputChanged(event: any) { // the keyboard input is strings -- adjust for string inputs. same w/ handleIntegral
    if (event?.target?.value != undefined && !isNaN(event.target.value)) {
      this.x = parseInt(event.target.value)

      console.log(this.activeExpression)

      this.graphChanged.next({
        equations: this.equations,
        activeExpression: this.activeExpression,
        x: parseInt(event.target.value)
      });

      // console.log(this.type)
      this.getCalculation({target:{value: this.type}})
      // console.log(this.answer)
    }
  }

  handlePress(event) {
    const key = event?.target?.value
    if (key == "CE") {
      // this.expression[this.activeExpression] = "" // TODO: add the logic here!
    } else if (key == "=") {
      // console.log(this.expression)
      // this.onGraph.emit(this.expression)
    }
    else {
      this.inputValue[this.activeInputIndex] += key // handle regular key presses
    }
  }

  lowerInputActivated() { // for the lower bound input for integral calculations Only
    this.buttonService.setLastFocus("lowerInput")
  }

  inputActivated() { // upper bound for integrals, default input for all others
    this.buttonService.setLastFocus("input")
  }

}
