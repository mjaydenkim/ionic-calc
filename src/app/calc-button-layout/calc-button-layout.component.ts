import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CalcButtonService } from '../services/calc-button.service';

export const primaryButtons = [
  "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+", "e", "π", "(", ")"
]

export const keyLookups = {
  tan: "tan(",
  sin: "sin(",
  cos: "cos(",
  atan: "atan(",
  asin: "asin(",
  acos: "acos(",
  ln: "ln(",
  log: "log10(",
  nPr: "nPr(",
  nCr: "nCr(",
  "√": "sqrt(",
  "x^2": "^2",
  "e^x": "ｅ^",
  "1/x": "1/",
  "10^x": "10^",
  e: "ｅ", // mathjax is thrown off by this
}

@Component({
  selector: 'app-calc-button-layout',
  templateUrl: './calc-button-layout.component.html',
  styleUrls: ['./calc-button-layout.component.scss'],
})

export class CalcButtonLayoutComponent implements OnInit, OnChanges {

  @Input() mode: string
  @Input() keyboardDisplayed: number = 0
  
  smallButtons = [
    "2nd", "log", "ln", "ANS", "sin", "cos", "tan", "x", "√", "^", "←",
    "default", "10^x", "asin", "acos", "atan", "x^2", "e^x", "1/x", "CE",
    "nPr", "%", "frac", "rad", "abs", "nCr", "!", "dec", "deg", ","
  ]

  numButtons = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "="]
  opButtons = ["/", "*", "-", "+"]

  // fourFunctionDisplayedLayout = [
  //   ["e", "pi", "(", ")"],
  //   ["ANS", "sin(", "cos(", "tan("],
  //   ["sqrt(", "^", "<--", "CE"],
  //   ["7", "8", "9", "/"],
  //   ["4", "5", "6", "*"],
  //   ["1", "2", "3", "-"],
  //   ["0", ".", "=", "+"]
  // ]

  fourFunctionDefaultLayout = [ // add calculus etc
    ["2nd", "nPr", "%", "frac", "rad"], // 3rd should be % 
    ["log", "sin", "cos", "tan", ","],
    ["√", "ln", "^", "ANS", "←"],
    ["7", "8", "9", "/", "("],
    ["4", "5", "6", "*", ")"],
    ["1", "2", "3", "-", "π"],
    ["0", ".", "=", "+", "e"]
  ]

  fourFunction2ndLayout = [
    ["default", "nCr", "!", "dec", "deg"], 
    ["10^x", "asin", "acos", "atan", "abs"],
    ["x^2", "e^x", "1/x", "ANS", "CE"],
    ["7", "8", "9", "/", "("],
    ["4", "5", "6", "*", ")"],
    ["1", "2", "3", "-", "π"],
    ["0", ".", "=", "+", "e"]
  ]

  fourFunctionDisplayedLayout = this.fourFunctionDefaultLayout

  graphingDefaultLayout = [
    ["2nd", "log", "sin", "cos", "tan"],
    ["√", "ln", "^", "x", "←"],
    ["7", "8", "9", "/", "("],
    ["4", "5", "6", "*", ")"],
    ["1", "2", "3", "-", "π"],
    ["0", ".", "=", "+", "e"]
  ]

  graphing2ndLayout = [
    ["default", "10^x", "asin", "acos", "atan"],
    ["x^2", "e^x", "1/x", "x", "CE"],
    ["7", "8", "9", "/", "("],
    ["4", "5", "6", "*", ")"],
    ["1", "2", "3", "-", "π"],
    ["0", ".", "=", "+", "e"]
  ]

  graphingDisplayedLayout = this.graphingDefaultLayout
  
  constructor(public buttonService: CalcButtonService) {
    this.buttonService = buttonService
  }

  ngOnInit() {
    this.updateLayout()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateLayout()
  }

  handlePress(key: string) {
    this.buttonService.notify(this.getKey(key))
  }

  getSize(button: string) {
    if (primaryButtons.includes(button)) {
      return "large"
    } else if (this.smallButtons.includes(button)) {
      return "small"
    } else {
      return "medium"
    }
  }

  getColor(button: string) {
    if (button == "2nd" || button == "default") {
      return "tertiary"
    } else if (this.numButtons.includes(button)) {
      return "primary"
    } else if (this.opButtons.includes(button)) {
      return "secondary"
    } else {
      return "default"
    }
  }

  getKey(displayKey: string): string {
    if (displayKey in keyLookups) {
      return keyLookups[displayKey]
    }

    return displayKey
  }

  getSecondary(button: string) {
    let modeDisplayedList = this.mode === 'default' ? this.fourFunctionDisplayedLayout : this.graphingDisplayedLayout // only kinda works
    let secondaryButton: string;
    for (let i = 0; i < modeDisplayedList.length; i++) {
      let indexVal = modeDisplayedList[i].indexOf(button)
      if (indexVal != -1) {
        if (this.keyboardDisplayed == 0) { // if displayed keyboard is default
          if (this.mode == "default") {
            secondaryButton = this.fourFunction2ndLayout[i][indexVal]
          }
          if (this.mode == "graphing") {
            secondaryButton = this.graphing2ndLayout[i][indexVal]
          }
        } else if (this.keyboardDisplayed == 1) { // if displayed keyboard is secondary
          if (this.mode == "default") {
            secondaryButton = this.fourFunctionDefaultLayout[i][indexVal]
          }
          if (this.mode == "graphing") {
            secondaryButton = this.graphingDefaultLayout[i][indexVal]
          }
        }
        if (secondaryButton != button) {
          return secondaryButton
        }
        // return this.graphing2ndLayout[i][indexVal]
      }
    }
    return ""
  }

  updateLayout() {
    if (this.mode == "default") {
      if (this.keyboardDisplayed == 0) {
        this.fourFunctionDisplayedLayout = this.fourFunctionDefaultLayout
      }

      if (this.keyboardDisplayed == 1) {
        this.fourFunctionDisplayedLayout = this.fourFunction2ndLayout
      }
    }
    else if (this.mode == "graphing") {
      if (this.keyboardDisplayed == 0) {
        this.graphingDisplayedLayout = this.graphingDefaultLayout
      }

      if (this.keyboardDisplayed == 1) {
        this.graphingDisplayedLayout = this.graphing2ndLayout
      }
    }
  }
}
