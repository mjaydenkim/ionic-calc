import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import functionPlot, { Chart } from 'function-plot'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import * as d3 from 'd3';

import { create, all } from 'mathjs';

import { Subject, map } from 'rxjs'

import process from '../utilities/process';
import catchMathJaxError from '../utilities/catchMathJaxError';
import { HistoryEvent } from '../home/home.page';
import { CalcGraphCalculationsComponent } from '../components/calc-graph-calculations/calc-graph-calculations.component';

Notify.init({
  "clickToClose": true
})

const math = create(all)

@Component({
  selector: 'app-calc-graphing',
  templateUrl: './calc-graphing.component.html',
  styleUrls: ['./calc-graphing.component.scss'],
})

export class CalcGraphingComponent implements AfterViewInit {

  @Output() appendHistory: EventEmitter<HistoryEvent> = new EventEmitter<HistoryEvent>();
  mode: string = "graphing" // constant

  domainRight: number = 10
  domainLeft: number = -10
  errorCaught: boolean = false
  keyboardMode: number = 0

  activeExpression: number = 0
  equations = []
  x: number = 0

  @ViewChild("div1", { static: true }) div1;

  graphChanged: Subject<any> = new Subject(); // equations, activeExpression, x

  expression = "x";
  defaultDisplay = "x";

  graph: Chart

  constructor() { }

  ngAfterViewInit() {
    const group = [];
    group.push(this.createGraph(this.div1.nativeElement, [this.defaultDisplay]));
  }

  createGraph(element: Element, fn: string[]): Chart {
    this.graph = functionPlot({
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
    return this.graph
  }

  handleGraphing(event: string[]) { // toggle variable that shows whether or not there's an active graph. use it for ngif
    const group = [];
    try {
      group.push(this.createGraph(this.div1.nativeElement, event));
      console.log(event)

      this.appendHistory.emit({equation: event.join("; "), answer: "graph"})
      // todo: dynamic domain inference
      this.domainRight = 10
      this.domainLeft = -10

      this.equations = event
      
      this.graphChanged.next({
        equations: this.equations,
        activeExpression: this.activeExpression,
        x: this.x
      });

      let el = this.graph.root.select('rect.zoom-and-drag')

      el.on('click', (event) => {
        var mouse = d3.pointer(event, el.node())
        var x = this.graph.meta.xScale.invert(mouse[0])
        // var y = this.graph.meta.yScale.invert(mouse[1])
        this.x = x
        console.log(x)
        this.graphChanged.next({
          equations: this.equations,
          activeExpression: this.activeExpression,
          x: x
        });
      })
    } catch (e) {
      console.log(e.message);
      try { // autocorrects missing parentheses error (and other errors if they're coded into catchmathjaxerror, but none are right now)
        // if (catchMathJaxError(event, e) != null) {
          // event = catchMathJaxError(exp, e)
        // group.push(this.createGraph(this.div1.nativeElement, event));
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

  handleActiveExpressionChange(event: number) {
    console.log(event)
    this.activeExpression = event;
    this.graphChanged.next(this.graphChanged.pipe(
      map(g => ({...g, x: event})),
    ));
  }
}