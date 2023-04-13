import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalcButtonService } from '../../services/calc-button.service';

@Component({
  selector: 'calc-graph-display',
  templateUrl: './calc-graph-display.component.html',
  styleUrls: ['./calc-graph-display.component.scss'],
})
export class CalcGraphDisplayComponent implements OnInit {

  @Output() onGraph: EventEmitter<string[]> = new EventEmitter<string[]>(); // should emit array of strings
  @Output() keyboardModeChange: EventEmitter<number> = new EventEmitter<number>();

  expression: string[] = [""]
  activeExpression: number = 0 // (index of active expression)
  buttonSubscription: Subscription
  errorCaught: boolean = false
  lastMode: number = 0

  constructor(public buttonService: CalcButtonService) {
    this.buttonSubscription = buttonService.listen().subscribe((event) => {
      this.handlePress(event)
    })
  }

  ngOnInit() {}

  addExpression() {
    this.expression.push("")
    this.activeExpression = this.expression.length - 1
  }

  changeActiveExpression(event: any) {
    this.activeExpression = this.expression.indexOf(event.target.value)
  }

  handlePress(event) {
    if (this.lastMode == 1 && event != "2nd") {
      this.keyboardModeChange.emit(0)
    } // adds shift-like functionality to the 2nd key -- resets after button press

    if (this.errorCaught) {
      this.expression[this.activeExpression] = ""
      this.errorCaught = false
    } else if (event == "default") {
      this.keyboardModeChange.emit(0)
      this.lastMode = 0
    } else if (event == "2nd") {
      this.keyboardModeChange.emit(1)
      this.lastMode = 1
    }  else if (event == "CE") {
      this.expression[this.activeExpression] = ""
    }
    else if (event == "←") {
      this.expression[this.activeExpression] = this.expression[this.activeExpression].slice(0, -1)
    } else if (event == "=") {
      console.log(this.expression)
      this.onGraph.emit(this.expression)
    }
    else {
      this.expression[this.activeExpression] += event // TODO: handle rounding for large numbers
    }
    console.log(this.expression)
  }

}
