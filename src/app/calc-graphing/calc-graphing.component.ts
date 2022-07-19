import { AfterViewInit, Component, OnDestroy, OnInit, VERSION, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalcButtonService } from '../services/calc-button.service';
import functionPlot from 'function-plot'

import process from '../utilities/process';
import catchMathJaxError from '../utilities/catchMathJaxError';

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

  constructor(public buttonService: CalcButtonService) {
    this.buttonSubscription = buttonService.listen().subscribe((event) => {this.handlePress(event)})
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

    var data = [];

    // for (var i = 0; i < width; i++) {
    //   var x = x1 + i * xs;
    //   // var y = [eval(process(this.expression))]; // TODO: replace with mathjs and test
    //   try {
    //     var y = [math.evaluate(this.expression, {x: x})] // main change was made here
    //   } catch (err) {
    //     if (!this.errorCaught) {
    //       console.log(err)
    //       this.expression = err
    //       this.errorCaught = true
    //     }
    //     var y = [undefined]
    //   }
    //   var row = [x];

    //   if (y.length > 0) {
    //     for (var j = 0; j < y.length; j++) {
    //       if (!math.isNaN(y[j]) && isFinite(y[j])) { // if the value is complex, don't try to put it on the cartesian plane
    //         row.push(y[j]);
    //       } else {
    //         row.push(undefined) // because dygraphs can't process a one-item list (can't work with xval only). effectively the yval
    //       }
    //     }
    //   } else {
    //     row.push(y[0]);
    //   }
    //   data.push(row);
    // }
    
    // console.log(data)
    // return new Dygraph(graph, data);

    return functionPlot({
      width: 300,
      height: 200,
      target: '#root',
      data: [{
        fn: process(this.expression),
        graphType: 'polyline'
      }],
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
          // implement "toast" -- pop-up notif
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

}